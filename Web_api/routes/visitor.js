var express = require('express');
var router = express.Router();
var db = require('../DAL/dbConnectionManager');

/* GET home page. */
router.get('/', function(req, res, next) {
    var facebookid = req.headers.facebookid;
    var sqlString = "SELECT Date, Visitor from VisitorHistory WHERE FacebookId = ?";

    db.getConnection(function(err, connection) {
       if(err){
           db.releaseConnection(connection);
           res.send({status_code: 500, error: { message : "Cannot connect to database" }});
       } else {
           connection.query(sqlString, [facebookid], function(err,result){
               if(err === undefined || err === null){
                   res.send({ visitor: result });
               }
               else {
                   res.send({ status_code: 500, error: { message: "Cannot access user information" } });
               }
               db.releaseConnection(connection);
           })
       }
    });
});

module.exports = router;