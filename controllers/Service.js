"use strict"

var utils = require("../utils/writer.js")
var Service = require("../service/ServiceService")

module.exports.getAllServices = function getAllServices(req, res, next) {
  Service.getAllServices()
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      console.error(response)
      if (response.error && response.statusCode) {
        utils.writeJson(res, response.error, response.statusCode)
      } else {
        utils.writeJson(res, { error: "Please retry later" }, 500)
      }
    })
}

module.exports.getServiceById = function getServiceById(req, res, next) {
  var serviceId = req.swagger.params["serviceId"].value
  Service.getServiceById(serviceId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      console.error(response)
      if (response.error && response.statusCode) {
        utils.writeJson(res, response.error, response.statusCode)
      } else {
        utils.writeJson(res, { error: "Please retry later" }, 500)
      }
    })
}

module.exports.getServicesPresentedIn = function getServicesPresentedIn(
  req,
  res,
  next
) {
  var eventId = req.swagger.params["event-id"].value
  Service.getServicesPresentedIn(eventId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      console.error(response)
      if (response.error && response.statusCode) {
        utils.writeJson(res, response.error, response.statusCode)
      } else {
        utils.writeJson(res, { error: "Please retry later" }, 500)
      }
    })
}
