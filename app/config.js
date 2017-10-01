
// Create DB Connection
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'development-db.cnz84mebmahn.us-east-2.rds.amazonaws.com',
      user: 'admin',
      password: 'adminadmin',
      database: 'test'
    }
});


var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('visibility');
var express = require('express')
var framework = require('express')()
var bodyParser = require('body-parser')
var crypt = require('password-hash')
var jwt = require("jsonwebtoken");

framework.use(bodyParser.json())
framework.use(bodyParser.urlencoded({
  extended: true
}))

// Export configuration so rest of application can use this
exports.framework = framework
exports.orm = Bookshelf
exports.db = knex
exports.mods = {
  encrypt: crypt,
  jwt: jwt,
  handler: function(model, res, options = {}){
    var defaults = {
      sendData: true,
      successmsg: 'Operation Completed Successfully!',
      httpcode: 404,
      errormsg: 'Object not found.',
      fetchAll: false
    };
    var options = Object.assign({}, defaults, options);

      if(options.fetchAll) {
        var final = model.fetchAll()
      } else {
        var final = model.fetch()
      }

      return final.then(function(result){
          if(result != null) {
              if(options.sendData) {
                return res.json(result.toJSON())
              } else {
                return res.json({message: options.successmsg})
              }
          } else {
              res.statusCode = options.httpcode;
              return res.send(options.errormsg)
          }
      })
  }
}
exports.config = {
  JWT_SECRET: '34580e4sdfjlk4849fudfjk38sdfsjfhdj'
}
