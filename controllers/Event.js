"use strict"

var utils = require("../utils/writer.js")
var Event = require("../service/EventService")

module.exports.getAllEvent = function getAllEvent(req, res, next) {
  Event.getAllEvent()
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getAllEventByMonth = function getAllEventByMonth(
  req,
  res,
  next
) {
  Event.getAllEventByMonth()
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getEventByID = function getEventByID(req, res, next) {
  var eventId = req.swagger.params["eventId"].value
  Event.getEventByID(eventId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getEventPresentsService = function getEventPresentsService(
  req,
  res,
  next
) {
  var serviceId = req.swagger.params["service-id"].value
  Event.getEventPresentsService(serviceId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getNextEvent = function getNextEvent(req, res, next) {
  var eventId = req.swagger.params["eventId"].value
  Event.getNextEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getNextPresentsEvent = function getNextPresentsEvent(
  req,
  res,
  next
) {
  var eventId = req.swagger.params["eventId"].value
  var service = req.swagger.params["service-id"].value
  Event.getNextPresentsEvent(eventId, service)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getPreviousEvent = function getPreviousEvent(req, res, next) {
  var eventId = req.swagger.params["eventId"].value
  Event.getPreviousEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getPreviousPresentsEvent = function getPreviousPresentsEvent(
  req,
  res,
  next
) {
  var eventId = req.swagger.params["eventId"].value
  var service = req.swagger.params["service-id"].value
  Event.getPreviousPresentsEvent(eventId, service)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}
