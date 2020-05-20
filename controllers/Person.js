'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.getAllPersons = function getAllPersons (req, res, next) {
  Person.getAllPersons()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPersonByID = function getPersonByID (req, res, next) {
  var personId = req.swagger.params['person-id'].value;
  Person.getPersonByID(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPersonContact = function getPersonContact (req, res, next) {
  var eventId = req.swagger.params['event-id'].value;
  Person.getPersonContact(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPersonInvolvedIn = function getPersonInvolvedIn (req, res, next) {
  var serviceId = req.swagger.params['service-id'].value;
  Person.getPersonInvolvedIn(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
