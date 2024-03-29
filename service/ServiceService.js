"use strict"
let sqlDb

exports.serviceDbSetup = function (s) {
  sqlDb = s
  console.log("Checking if table exists")
  return sqlDb.schema.hasTable("service").then((exists) => {
    if (!exists) {
      console.log("It doesn't so we create it")
      return sqlDb.schema
        .createTable("service", (table) => {
          table.increments("id").primary().notNullable()
          table.string("name").notNullable()
          table.text("description").notNullable()
          table.string("photo_description").notNullable()
          table.text("presentation")
        })
        .createTable("service_info", (table) => {
          table.increments("id").primary().notNullable()
          table.text("info").notNullable()
          table
            .integer("service_id")
            .references("id")
            .inTable("service")
            .notNullable()
        })
        .createTable("service_photo", (table) => {
          table.increments("id").primary().notNullable()
          table.string("title").notNullable()
          table
            .integer("service_id")
            .references("id")
            .inTable("service")
            .notNullable()
        })
    } else {
      console.log("It exists.")
    }
  })
}

/**
 * Returns the list of all services
 *
 * returns List
 **/
exports.getAllServices = function () {
  return new Promise(async function (resolve, reject) {
    try {
      var services = await sqlDb("service").select(
        "id",
        "name",
        "description",
        "photo_description"
      )

      resolve(services)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Return the service that correspond to the id
 *
 * serviceId Long
 * returns Service
 **/
exports.getServiceById = function (serviceId) {
  return new Promise(async function (resolve, reject) {
    try {
      var service = await sqlDb("service")
        .where("service.id", serviceId)
        .leftJoin("service_info", "service.id", "=", "service_info.service_id")
        .leftJoin(
          "service_photo",
          "service.id",
          "=",
          "service_photo.service_id"
        )
        .select("service.id", "name", "presentation", "info", "title")

      if (service.length == 0) {
        reject({
          statusCode: 400,
          error: "The id doesn't correspond to a service",
        })
      }

      var photos = []
      var infos = []
      service.forEach(function (element) {
        if (photos.indexOf(element.title) == -1 && element.title != null) {
          photos.push(element.title)
        }

        if (infos.indexOf(element.info) == -1 && element.info != null) {
          infos.push(element.info)
        }
      })

      var resp = {
        id: service[0].id,
        name: service[0].name,
        presentation: service[0].presentation,
        "practical-info": infos,
        photo: photos,
      }

      resolve(resp)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Return the services description presented in the event specified
 *
 * eventId Long
 * returns List
 **/
exports.getServicesPresentedIn = function (eventId) {
  return new Promise(function (resolve, reject) {
    try {
      var services = sqlDb("presents")
        .where("event_id", eventId)
        .join("service", "id", "=", "service_id")
        .select("id", "name")

      resolve(services)
    } catch (e) {
      reject(e)
    }
  })
}
