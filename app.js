var globals=require("./models/globals.js");
var config=globals.config;
var express = globals.express;
var app = globals.app;
var http = globals.http;
var io = globals.io;

var cookieParser =globals.cookieParser;
var session =globals.session;

var expressValidator =globals.expressValidator;
var bodyParser =globals.bodyParser;
var socketioJwt =globals.socketioJwt;

io.use(socketioJwt.authorize({
    secret: config.IO_SECRET,
    handshake: true
}));

//Cookie parser
app.use(cookieParser());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Set Headers
app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Cache-control', 'no-cache,public,max-age=3600*24*7');
    /*if ((/(\.gif|\.png|\.jpg|\.jpeg|\.woff|\.ico)$/).test(req.path)){//\.js|\.css|
        res.setHeader('Cache-control', 'max-age=2592000000,public');
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
    }*/
    next();
});

//body and query Parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(expressValidator());

app.get('/', function(req, res) {
    console.log("session data:", req.session.email);
    res.sendFile(__dirname + '/public/index.html');
});

//Serve stattic files
app.use('/static', express.static(__dirname + '/public'));

//Authentication routes
var authRouter=require("./routes/authentication.js").router;
app.use("/",authRouter);

//Socket.io controller
var ioHandler=require("./controllers/ioc.js").connection;
io.on('connection', ioHandler);

//Error handler
app.use(function(err, req, res, next) {
    console.log("Error : handler: ", err);
    return res.status(200).send("Some Error Occured");
});

//Not found Handler
app.use(function(req, res, next) {
    return res.status(404).send("Not Foud");
});


http.listen(3000, function() {
    console.log('listening on *:3000');
});