/*
 *  Created by Shashwat.
 */
var db = require('../DAL/dbConnectionManager');
var User = function(data){
    this.data.FacebookId = data.FacebookId;
    this.data.AccessToken = data.AccessToken;
    this.data.UseMode = data.UseMode;
    this.data.DeviceOS = data.DeviceOS;
    this.data.Username = data.Username
    this.data.DeviceID = data.DeviceID
    this.data.DeviceToken = data.DeviceToken
};

User.prototype.data = {};

User.prototype.FindUserByID = function(callback){
    var data = this.data;
    var sqlString = "SELECT * from Users WHERE FacebookId = ? AND deviceID = ?";

    db.getConnection(function(err, connection) {
       if(err) {
           db.releaseConnection(connection);
           callback({status_code: 500, error: { message : "Cannot connect to database" }});
       } else {
           connection.query(sqlString, [data.FacebookId, data.DeviceID], function(err,result){
               if(err === undefined || err === null){
                   callback({ user: result });
               }
               else{
                   callback({ status_code: 500, error: { message: "Cannot access user information" } });
               }
               db.releaseConnection(connection);
           })
       }
    });
};

User.prototype.getUsers = function(callback) {
    var data = this.data;
    var sqlString = "SELECT * from Users WHERE FacebookId = ? AND UseMode = 2";

    db.getConnection(function(err, connection) {
       if(err){
           db.releaseConnection(connection);
           callback({status_code: 500, error: { message : "Cannot connect to database" }});
       }
       else{
           connection.query(sqlString, [data.FacebookId], function(err,result){
               if(err === undefined || err === null) {
                   callback({ users: result });
               }
               else {
                   callback({ status_code: 500, error: { message: "Cannot access user information" } });
               }
               db.releaseConnection(connection);
           })
       }
    });
}

User.prototype.Update = function(callback) {
    var data = this.data;
    var sqlString = "UPDATE Users SET AccessToken = ?, DeviceToken = ?, UseMode = ? WHERE FacebookId = ? AND deviceID = ?";
    db.getConnection(function(err, connection) {
        if(err) {
            db.releaseConnection(connection);
            callback({ status_code: 500, error : { message : "Cannot connect to database" } });
        }
        else {
            connection.query(sqlString,[data.AccessToken, data.DeviceToken, data.UseMode, data.FacebookId, data.DeviceID],function (err, result){
                if(err === undefined || err === null) {
                    callback({ user: data });
                }
                else{
                    callback({ status_code: 500, error: { message: "Cannot access user information" } });
                }
                db.releaseConnection(connection);
            });
        }
    });
}

User.prototype.InsertIfNotPresent = function(callback){
    var data = this.data;
    var sqlString = "INSERT INTO Users (FacebookId, AccessToken, UseMode, DeviceOS, Username, DeviceID, DeviceToken) VALUES ( ?, ?, ?, ?, ?, ?, ?) " +
                    " ON DUPLICATE KEY UPDATE AccessToken = VALUES(AccessToken)";
    db.getConnection(function(err, connection) {
        if(err){
            db.releaseConnection(connection);
            callback({ status_code: 500, error : { message : "Cannot connect to database" } });
        }
        else{
            connection.query(sqlString,[data.FacebookId, data.AccessToken, data.UseMode, data.DeviceOS, data.Username, data.DeviceID, data.DeviceToken],function (err, result){
                if(err === undefined || err === null){
                    callback({ user: data });
                }
                else{
                    callback({ status_code: 500, error: { message: "Cannot access user information" } });
                }
                db.releaseConnection(connection);
            });
        }
    });
};

module.exports = User;