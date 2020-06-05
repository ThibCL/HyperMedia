"use strict"
let sqlDb

exports.personDbSetup = function (s) {
  sqlDb = s
  console.log("Checking if table exists")
  return sqlDb.schema.hasTable("person").then((exists) => {
    if (!exists) {
      console.log("It doesn't so we create it")
      return sqlDb.schema
        .createTable("person", (table) => {
          table.increments("id").primary().notNullable()
          table.string("first_name").notNullable()
          table.string("last_name").notNullable()
          table.text("description")
        })
        .createTable("person_photo", (table) => {
          table.increments("id").primary().notNullable()
          table.string("title").notNullable()
          table
            .integer("person_id")
            .references("id")
            .inTable("person")
            .notNullable()
        })
        .createTable("involves", (table) => {
          table
            .integer("person_id")
            .references("id")
            .inTable("person")
            .notNullable()
          table
            .integer("service_id")
            .references("id")
            .inTable("service")
            .notNullable()
          table.string("role")
          table.primary(["service_id", "person_id"])
        })
    } else {
      console.log("It exists.")
    }
  })
}

/**
 * returns the list of all persons
 *
 * returns List
 **/
exports.getAllPersons = function () {
  return new Promise(async function (resolve, reject) {
    try {
      var persons = await sqlDb("person")
        .orderBy("last_name", "asc")
        .select("id", "last_name", "first_name")
      resolve(persons)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * return the person that corresponds to the id
 *
 * personId Long
 * returns Person
 **/
exports.getPersonByID = function (personId) {
  return new Promise(async function (resolve, reject) {
    try {
      var person = await sqlDb("person")
        .leftJoin("person_photo", "person.id", "=", "person_id")
        .where("person.id", personId)

      if (person.length == 0) {
        reject({
          error: "The id does not correspond to a person",
          statusCode: 400,
        })
      }

      var photos = []
      person.forEach((element) => {
        element.title != null && photos.push(element.title)
      })

      var resp = {
        "person-id": person[0].person_id || personId,
        "first-name": person[0].first_name,
        "last-name": person[0].last_name,
        description: person[0].description,
        photo: photos,
      }

      resolve(resp)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Return the person involved in the service specified
 *
 * serviceId Long
 * returns List
 **/
exports.getPersonInvolvedIn = function (serviceId) {
  return new Promise(async function (resolve, reject) {
    try {
      var persons = await sqlDb("involves")
        .where("service_id", serviceId)
        .join("person", "person_id", "=", "person.id")
        .leftJoin("person_photo", "person.id", "=", "person_photo.person_id")
        .select(
          "person.id",
          "description",
          "first_name",
          "last_name",
          "role",
          "title as photo"
        )

      var pers = {}
      persons.forEach((item) => {
        if (pers[item.id]) {
          pers[item.id].push(item.photo)
        } else {
          pers[item.id] = item.photo ? [item.photo] : []
        }
      })

      var roles = {}
      persons.forEach((item) => {
        if (pers[item.id]) {
          item.photo = pers[item.id]
          roles[item.role]
            ? roles[item.role].push(item)
            : (roles[item.role] = [item])

          delete pers[item.id]
        }
      })

      var resp = []
      Object.entries(roles).forEach(([key, value]) => {
        resp.push({ role: key, persons: value })
      })

      resolve(resp)
    } catch (e) {
      reject(e)
    }
  })
}
