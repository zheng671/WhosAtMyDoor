/**
 * Created by Shashwat on 9/21/16.
 */
var config = require('./configuration.js');
var mysql = require('mysql');

// Initializing the Connection Pool
var db = db || {};
db.pool = {};
db.pool = mysql.createPool(config.remoteDb);
db.getConnection = function(callback) {
    if(!db.pool){
        db.pool = mysql.createPool(config.remoteDb);
    }

    db.pool.getConnection(function(err, connection) {
        // Use the connection
        callback(err,connection);
        });
};

db.releaseConnection = function(conn){
    if(conn) {
        if(db.pool._freeConnections.indexOf(conn)){
            conn.release();
        }
    }
};
module.exports = db;