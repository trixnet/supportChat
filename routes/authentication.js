var globals=require('../models/globals.js');
var controllers=require("../controllers/authentication.js");

var express=globals.express;
var app=express.Router();

app.post("/start-chat", controllers.startChat);

exports.router=app;