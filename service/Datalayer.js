let { eventDbSetup } = require("./EventService")
let { personDbSetup } = require("./PersonService")
let { serviceDbSetup } = require("./ServiceService")

const sqlDbFactory = require("knex")
let sqlDb = sqlDbFactory({
  debug: true,
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
})

// let sqlDb = sqlDbFactory({
//   debug: true,
//   client: "pg",
//   connection: {
//     host: "localhost",
//     database: "hypermedia",
//     user: "postgres",
//     password: process.env.PASSWORD,
//   },
// })
// For dev, for final version use the code above

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
