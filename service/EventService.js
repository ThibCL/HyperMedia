"use strict"
let sqlDb

exports.eventDbSetup = function (s) {
  sqlDb = s
  console.log("Checking if table exists")
  return sqlDb.schema.hasTable("event").then((exists) => {
    if (!exists) {
      console.log("It doesn't so we create it")
      return sqlDb.schema
        .createTable("event", (table) => {
          table.increments("id").primary().notNullable()
          table.text("name").notNullable()
          table.text("presentation")
          table.date("start_date").notNullable()
          table.date("end_date").notNullable()
          table.integer("contact").references("id").inTable("person")
        })
        .createTable("event_info", (table) => {
          table.increments("id").primary().notNullable()
          table.text("info").notNullable()
          table
            .integer("event_id")
            .references("id")
            .inTable("event")
            .notNullable()
        })
        .createTable("event_photo", (table) => {
          table.increments("id").primary().notNullable()
          table.string("title").notNullable()
          table.integer("event_id").references("id").inTable("event")
        })
        .createTable("presents", (table) => {
          table
            .integer("service_id")
            .references("id")
            .inTable("service")
            .notNullable()
          table
            .integer("event_id")
            .references("id")
            .inTable("event")
            .notNullable()
          table.primary(["service_id", "event_id"])
        })
    } else {
      console.log("It exists.")
    }
  })
}

/**
 * return the list of all events
 *
 * returns List
 **/
exports.getAllEvent = function () {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        "end-date": "2020-10-23",
        "photo-description": "garbage-collection-2020-10-23",
        name: "garbage collection at the Seine banks.",
        description: "description",
        "start-date": "2020-10-23",
        "event-id": 3,
      },
      {
        "end-date": "2020-10-23",
        "photo-description": "garbage-collection-2020-10-23",
        name: "garbage collection at the Seine banks.",
        description: "description",
        "start-date": "2020-10-23",
        "event-id": 2,
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
 * return the list of all events sorted by month
 *
 * returns List
 **/
exports.getAllEventByMonth = function () {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        date: "2000-01-23",
        events: [
          {
            "end-date": "2020-10-23",
            "photo-description": "garbage-collection-2020-10-23",
            name: "garbage collection at the Seine banks.",
            description: "description",
            "start-date": "2020-10-23",
            "event-id": 3,
          },
          {
            "end-date": "2020-10-23",
            "photo-description": "garbage-collection-2020-10-23",
            name: "garbage collection at the Seine banks.",
            description: "description",
            "start-date": "2020-10-23",
            "event-id": 2,
          },
        ],
      },
      {
        date: "2000-01-24",
        events: [
          {
            "end-date": "2020-10-23",
            "photo-description": "garbage-collection-2020-10-23",
            name: "garbage collection at the Seine banks.",
            description: "description",
            "start-date": "2020-10-23",
            "event-id": 3,
          },
          {
            "end-date": "2020-10-23",
            "photo-description": "garbage-collection-2020-10-23",
            name: "garbage collection at the Seine banks.",
            description: "description",
            "start-date": "2020-10-23",
            "event-id": 2,
          },
        ],
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
 * return the event that corresponds to the id
 *
 * eventId Long
 * returns Event
 **/
exports.getEventByID = function (eventId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        presentation:
          "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
        "end-date": "2020-10-23",
        "pratical-info": [
          "A document that summarizes all the information is available here ...",
          "If you want to propose some ideas you can send an email to ...",
        ],
        contact: "3",
        name: "garbage collection at the Seine banks.",
        "start-date": "2020-10-23",
        "event-id": 3,
        photos: ["garbage2020-10-23", "some-participant", "before-after"],
      },
      {
        presentation:
          "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
        "end-date": "2020-10-23",
        "pratical-info": [
          "A document that summarizes all the information is available here ...",
          "If you want to propose some ideas you can send an email to ...",
        ],
        contact: "3",
        name: "garbage collection at the garonne banks.",
        "start-date": "2020-10-23",
        "event-id": 1,
        photos: ["garbage2020-10-23", "some-participant", "before-after"],
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
 * returns the event that presents a service
 *
 * serviceId Long the service that we want presented in the events
 * returns List
 **/
exports.getEventPresentsService = function (serviceId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = [
      {
        presentation:
          "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
        "end-date": "2020-10-23",
        "pratical-info": [
          "A document that summarizes all the information is available here ...",
          "If you want to propose some ideas you can send an email to ...",
        ],
        contact: "contact",
        name: "garbage collection at the Seine banks.",
        "start-date": "2020-10-23",
        "event-id": 3,
        photos: ["garbage2020-10-23", "some-participant", "before-after"],
      },
      {
        presentation:
          "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
        "end-date": "2020-10-23",
        "pratical-info": [
          "A document that summarizes all the information is available here ...",
          "If you want to propose some ideas you can send an email to ...",
        ],
        contact: "contact",
        name: "garbage collection at the Seine banks.",
        "start-date": "2020-10-23",
        "event-id": 3,
        photos: ["garbage2020-10-23", "some-participant", "before-after"],
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
 * returns the next event
 *
 * eventId Long
 * returns Event
 **/
exports.getNextEvent = function (eventId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      presentation:
        "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
      "end-date": "2020-10-23",
      "pratical-info": [
        "A document that summarizes all the information is available here ...",
        "If you want to propose some ideas you can send an email to ...",
      ],
      contact: "contact",
      name: "garbage collection at the garonne banks.",
      "start-date": "2020-10-23",
      "event-id": 4,
      photos: ["garbage2020-10-23", "some-participant", "before-after"],
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}

/**
 * returns the next event that presents the service in query
 *
 * eventId Long
 * service Integer service id of the service we are doing the guided tour in
 * returns Event
 **/
exports.getNextPresentsEvent = function (eventId, service) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      presentation:
        "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
      "end-date": "2020-10-23",
      "pratical-info": [
        "A document that summarizes all the information is available here ...",
        "If you want to propose some ideas you can send an email to ...",
      ],
      contact: "contact",
      name: "garbage collection at the garonne banks.",
      "start-date": "2020-10-23",
      "event-id": 4,
      photos: ["garbage2020-10-23", "some-participant", "before-after"],
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}

/**
 * returns the previous event
 *
 * eventId Long
 * returns Event
 **/
exports.getPreviousEvent = function (eventId) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      presentation:
        "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
      "end-date": "2020-10-23",
      "pratical-info": [
        "A document that summarizes all the information is available here ...",
        "If you want to propose some ideas you can send an email to ...",
      ],
      contact: "contact",
      name: "garbage collection at the loire banks.",
      "start-date": "2020-10-23",
      "event-id": 2,
      photos: ["garbage2020-10-23", "some-participant", "before-after"],
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}

/**
 * returns the previous event that presents the service in query
 *
 * eventId Long
 * service Long service id of the service we are doing the guided tour in
 * returns Event
 **/
exports.getPreviousPresentsEvent = function (eventId, service) {
  return new Promise(function (resolve, reject) {
    var examples = {}
    examples["application/json"] = {
      presentation:
        "In this event we go to collect garbage on the Seine Banks for a day to have a nicer city. It is also a good way to meet people form the association!",
      "end-date": "2020-10-23",
      "pratical-info": [
        "A document that summarizes all the information is available here ...",
        "If you want to propose some ideas you can send an email to ...",
      ],
      contact: "contact",
      name: "garbage collection at the loire banks.",
      "start-date": "2020-10-23",
      "event-id": 2,
      photos: ["garbage2020-10-23", "some-participant", "before-after"],
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]])
    } else {
      resolve()
    }
  })
}
