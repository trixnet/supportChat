var globals=require("../models/globals.js");
var config=globals.config;
var mongo = globals.mongoClient;
var io=globals.io;

/**
 * @description [Socket.io Connection Handler] 
 * @param  {[SocketObject]}
 */
var connection=function(socket) {
    console.log('user connected', socket.id);
    if (io.sockets.connected[socket.id]) {
        io.sockets.connected[socket.id].emit('connection-success', {
            id: socket.id,
            msg: "connection successfull"
        });
    }
    socket.on('chatp2p', function(msg) {
    	console.log("decoded_token",socket.decoded_token);
        console.log('message: ' + JSON.stringify(msg));
        mongo.connect(config.mongo_url, function(err, db) {
            if (err) {
                console.log("MOngodbConnection Failed: ", err);
            } else {
                var users = db.collection('users');
                users.insertMany([msg], function(err, result) {
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
        });
    });
    socket.on('disconnect', function() {
        console.log('user disconnected',socket.decoded_token);
    });
}

module.exports={
	connection:connection
}