//CONFIG file
var config=require("../config.js");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoClient=require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('uuid');
var util = require('util');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var socketioJwt = require("socketio-jwt");
var jwt = require('jsonwebtoken');
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/sync.log', category: 'sync' }
  ]
});
var logger = log4js.getLogger('sync');
logger.setLevel('ERROR');

module.exports={
	config: config,
	express: express,
	app: app,
	http: http,
	io: io,
	mongoClient: mongoClient,
	cookieParser: cookieParser,
	session: session,
	uuid: uuid,
	util: util,
	expressValidator: expressValidator,
	bodyParser: bodyParser,
	socketioJwt: socketioJwt,
	jwt: jwt,
	logger: logger
}