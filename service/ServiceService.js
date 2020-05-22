"use strict"
// let sqlDb
const sqlDbFactory = require("knex")
let sqlDb = sqlDbFactory({
  debug: true,
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "gameboy",
    database: "hypermedia",
  },
})

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
  return new Promise(function (resolve, reject) {
    var service = sqlDb("service")
      .where("service.id", serviceId)
      .join("service_info", "service.id", "=", "service_info.service_id")
      .join("service_photo", "service.id", "=", "service_photo.service_id")
      .select("service.id", "name", "presentation", "info", "title")

    var examples = {}
    examples["application/json"] = service

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
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
