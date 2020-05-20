'use strict';


/**
 * Retrieve data of the user of the current session
 *
 * returns User
 **/
exports.getMe = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user-id" : 3,
  "username" : "Thibz"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Permit to an user to login
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.login = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

