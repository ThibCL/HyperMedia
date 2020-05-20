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
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        description:
          "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
        photo: ["michael-jordan", "micheal-at-his-first-event"],
        "person-id": 3,
        "first-name": "Micheal",
        "last-name": "jordan",
      },
      {
        description:
          "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
        photo: ["michael-jordan", "micheal-at-his-first-event"],
        "person-id": 3,
        "first-name": "Micheal",
        "last-name": "jordan",
      },
    ]
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
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
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      description:
        "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
      photo: ["michael-jordan", "micheal-at-his-first-event"],
      "person-id": 3,
      "first-name": "Micheal",
      "last-name": "jordan",
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}

/**
 * Returns the contact person of the specified event
 *
 * eventId Long
 * returns Person
 **/
exports.getPersonContact = function (eventId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      description:
        "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
      photo: ["michael-jordan", "micheal-at-his-first-event"],
      "person-id": 3,
      "first-name": "Micheal",
      "last-name": "jordan",
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
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
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        description:
          "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
        photo: ["michael-jordan", "micheal-at-his-first-event"],
        "person-id": 3,
        "first-name": "Micheal",
        "last-name": "jordan",
      },
      {
        description:
          "One of our most dedicated member. Joined in 2018 and is now responsible for the event organisation.",
        photo: ["michael-jordan", "micheal-at-his-first-event"],
        "person-id": 3,
        "first-name": "Micheal",
        "last-name": "jordan",
      },
    ]
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}
