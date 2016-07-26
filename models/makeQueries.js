var globals = require("./globals.js");
var config = globals.config
var util = globals.util;
var jwt = globals.jwt;
var mongo = globals.mongoClient;
var io = globals.io;
var logger = globals.logger;

var exec_query = function(query,collection) {
    mongo.connect(config.mongo_url, function(connErr, db) {
        if (connErr) {
            logger.error("[makeQuerie.js][exec_query][conn_error]",connErr);
            return callback(connErr,null);
        } else {
            var collectio = db.collection(collection);
            users.find(query, function(queryErr, result) {
                db.close();
                if (queryErr) {
                    logger.error("[makeQuerie.js][exec_query][query_error]",queryErr);
                    return callback(queryErr,null);
                } else {
                    logger.debug("[",collection,"]Query:",query,"-->",result);
                    return callback(null,result);
                }
            });

        }
    });
}