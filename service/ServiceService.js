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
          table.text("name").notNullable()
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
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        "service-id": 3,
        "photo-description": "energy-service",
        name: "Energy/Climat",
        description:
          "This service handle everything that is related to the energy and the climat.",
      },
      {
        "service-id": 3,
        "photo-description": "energy-service",
        name: "Energy/Climat",
        description:
          "This service handle everything that is related to the energy and the climat.",
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
 * Return the service that correspond to the id
 *
 * serviceId Long
 * returns Service
 **/
exports.getServiceById = function (serviceId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      presentation:
        "This service has been created in 1938 and its purpose is to sensibilise company and people of the impact of poluition in the climat but also about saving energy.",
      "service-id": 3,
      "photo-description": "energy-service",
      "pratical-info": [
        "A document that summarizes all the information is available here ...",
        "If you want to propose some ideas you can sen an email to ...",
      ],
      name: "Energy/Climat",
      description:
        "This service handle everything that is related to the energy and the climat.",
      photo: ["service-building", "the-team", "result"],
    }
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
    var examples = {}
    examples["application/json"] = [
      {
        "service-id": 3,
        "photo-description": "energy-service",
        name: "Energy/Climat",
        description:
          "This service handle everything that is related to the energy and the climat.",
      },
      {
        "service-id": 3,
        "photo-description": "energy-service",
        name: "Energy/Climat",
        description:
          "This service handle everything that is related to the energy and the climat.",
      },
    ]
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}
