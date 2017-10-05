/**
 * Created by Shashwat.
 */
var config = {};
config.remoteDb = {
    host : "mobile-team5.cgqzpa01imqu.us-east-1.rds.amazonaws.com",
    user : "shashwat",
    password : "password",
    database : "MobileApp",
    debug: false
};
config.localDb = {
    host : "localhost",
    user : "root",
    password : "shashwat16",
    database : "MobileApp",
    connectionLimit : 100,
    debug: false
};
config.sessionSecret = {
    secret: "complexPassword"
};
module.exports = config;