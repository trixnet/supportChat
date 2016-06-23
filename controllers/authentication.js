var globals=require("../models/globals.js");
var config=globals.config
var util=globals.util;
var jwt =globals.jwt;
var mongo=globals.mongoClient;

var startChat=function(req, res) {
    req.checkBody({
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        }
    });
    var errors = req.validationErrors();
    if (errors) {
        console.log(util.inspect(errors));
        return res.status(400).json({
            error: util.inspect(errors)
        });
    } else {
        /*mongo.connect(config.mongo_url, function(err, db) {
            if (err) {
                console.log("MOngodbConnection Failed:[controllers][startChat1] ", err);
            } else {
                var users = db.collection('users');
                users.find({}, function(err, result) {
                    db.close();
                    if (err) {
                        console.log("MOngodbQuery Failed: ", err);
                        io.sockets.connected[socket.id].emit('chtp2p-received', {
                            msg: "failed to send msg",status:false
                        });
                    } else {
                        io.sockets.connected[socket.id].emit('chtp2p-received', {
                            msg: "message sent",status:true
                        });
                    }
                });

            }
        });*/
        console.log(req.hostname);
        req.session.email = req.body.email;
        var token = jwt.sign({
            email: req.body.email
        }, config.IO_SECRET, {
            expiresIn: "2days"
        });
        req.session.token=token;
        return res.status(200).json({
            login: "ok",token:token
        });
    }
}

module.exports={
    startChat:startChat
}