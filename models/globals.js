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

module.exports={
	config:config,
	express:express,
	app:app,
	http:http,
	io:io,
	mongoClient:mongoClient,
	cookieParser:cookieParser,
	session:session,
	uuid:uuid,
	util:util,
	expressValidator:expressValidator,
	bodyParser:bodyParser,
	socketioJwt:socketioJwt,
	jwt:jwt
}