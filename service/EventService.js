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
          table.text("description").notNullable()
          table.string("photo_description").notNullable()
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
  return new Promise(async function (resolve, reject) {
    try {
      var events = await sqlDb("event")
        .select(
          "event.id",
          "description",
          "photo_description",
          "name",
          "start_date",
          "end_date"
        )
        .orderBy("start_date", "desc")

      resolve(events)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * return the list of all events sorted by month
 *
 * returns List
 **/
exports.getAllEventByMonth = function () {
  return new Promise(async function (resolve, reject) {
    try {
      var events = await sqlDb("event")
        .orderBy("start_date", "desc")
        .select(
          "id",
          "description",
          "photo_description",
          "name",
          "start_date",
          "end_date"
        )

      var eventmonth = {}
      events.forEach((element) => {
        var month = new Date(
          element.start_date.getFullYear(),
          element.start_date.getMonth(),
          0
        )

        eventmonth[month]
          ? eventmonth[month].push(element)
          : (eventmonth[month] = [element])
      })

      var resp = []
      for (let [key, value] of Object.entries(eventmonth)) {
        resp.push({ month: key, events: value })
      }

      resolve(resp)
    } catch (e) {
      reject(e)
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
  return new Promise(async function (resolve, reject) {
    try {
      var event = await sqlDb("event")
        .leftJoin("event_photo", "event.id", "=", "event_photo.id")
        .where("event.id", eventId)

      if (event.length == 0) {
        reject({
          error: "The id does not correspond to an event",
          statusCode: 400,
        })
      }

      var photos = []
      event.forEach((element) => {
        element.title != null && photos.push(element.title)
      })

      var info = await sqlDb("event_info")
        .select("info")
        .where("event_id", eventId)

      var resp = {
        "event-id": event[0].id || eventId,
        name: event[0].name,
        "end-date": event[0].end_date,
        "start-date": event[0].start_date,
        presentation: event[0].presentation,
        photos: photos,
        "practical-info": info,
        contact: event[0].contact,
      }

      resolve(resp)
    } catch (e) {
      reject(e)
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
  return new Promise(async function (resolve, reject) {
    try {
      var ids = await sqlDb("presents")
        .where("service_id", serviceId)
        .select("event_id")

      ids = ids.map((x) => x.event_id)

      var resp = await sqlDb("event")
        .whereIn("id", ids)
        .orderBy("start_date", "desc")
        .select("id", "description", "name", "start_date", "end_date")

      resolve(resp)
    } catch (e) {
      reject(e)
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
  return new Promise(async function (resolve, reject) {
    try {
      var date = await sqlDb("event")
        .where("event.id", eventId)
        .select("start_date")

      var next = await sqlDb("event")
        .where("start_date", ">", date[0].start_date)
        .orderBy("start_date", "asc")
        .limit(1)
        .select("id")

      if (next.length == 0) {
        resolve({ id: 0 })
      } else {
        resolve(next[0])
      }
    } catch (e) {
      reject(e)
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
exports.getNextPresentsEvent = function (eventId, serviceId) {
  return new Promise(async function (resolve, reject) {
    try {
      var date = await sqlDb("event")
        .where("event.id", eventId)
        .select("start_date")

      var ids = await sqlDb("presents")
        .where("service_id", serviceId)
        .select("event_id")
      ids = ids.map((x) => x.event_id)

      var next = await sqlDb("event")
        .whereIn("id", ids)
        .andWhere("start_date", ">", date[0].start_date)
        .orderBy("start_date", "asc")
        .limit(1)
        .select("id")

      if (next.length == 0) {
        resolve({ id: 0 })
      } else {
        resolve(next[0])
      }
    } catch (e) {
      reject(e)
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
  return new Promise(async function (resolve, reject) {
    try {
      var date = await sqlDb("event")
        .where("event.id", eventId)
        .select("start_date")

      var next = await sqlDb("event")
        .where("event.start_date", "<", date[0].start_date)
        .orderBy("start_date", "desc")
        .limit(1)
        .select("id")

      if (next.length == 0) {
        resolve({ id: 0 })
      } else {
        resolve(next[0])
      }
    } catch (e) {
      reject(e)
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
exports.getPreviousPresentsEvent = function (eventId, serviceId) {
  return new Promise(async function (resolve, reject) {
    try {
      var date = await sqlDb("event")
        .where("event.id", eventId)
        .select("start_date")

      var ids = await sqlDb("presents")
        .where("service_id", serviceId)
        .select("event_id")
      ids = ids.map((x) => x.event_id)

      var next = await sqlDb("event")
        .whereIn("id", ids)
        .andWhere("start_date", "<", date[0].start_date)
        .orderBy("start_date", "desc")
        .limit(1)
        .select("id")

      if (next.length == 0) {
        resolve({ id: 0 })
      } else {
        resolve(next[0])
      }
    } catch (e) {
      reject(e)
    }
  })
}
