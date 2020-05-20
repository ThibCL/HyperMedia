let { eventDbSetup } = require("./EventService")
let { personDbSetup } = require("./PersonService")
let { serviceDbSetup } = require("./ServiceService")

const sqlDbFactory = require("knex")
let sqlDb = sqlDbFactory({
  debug: true,
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "hypermedia",
  },
})

function setupDatalayer() {
  console.log("Setting up Data Layer")

  return new Promise(function (resolve, reject) {
    personDbSetup(sqlDb)
    serviceDbSetup(sqlDb)
    eventDbSetup(sqlDb)
    resolve()
  })
}

module.exports = { database: sqlDb, setupDatalayer }
