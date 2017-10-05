var express = require('express');
var router = express.Router();
var aws = require('./aws.js');
var push = require('./pushwoosh.js');
var User = require('../Models/User');
var db = require('../DAL/dbConnectionManager');

/* GET home page. */
router.get('/', function(req, res, next) {
    var faceImage = req.headers.faceimage;
    var facebookId = req.headers.facebookid;

    aws.detectFace(facebookId, faceImage, function(error, result) {
        if (error) {
            res.send({ error : { message : "Cannot detect faces" } });
        } else {
            console.log(result);

            res.send({ data : result });

            var user = new User({
                FacebookId: facebookId,
            });
            user.getUsers(function(res) {
                if (!res.users) {
                    console.log(res);
                } else {
                    var users = res.users;
                    var device = [];
                    for (var i = 0; i < users.length; ++i) {
                        device.push(users[i].DeviceToken);
                    }

                    var msg = "";
                    if (result.length == 1) {
                        msg = result[0] + " is visiting";
                    } else if (result.length > 2) {
                        msg = result.join(", ") + " are visiting";
                    } else {
                        msg = "Someone is visiting";
                    }

                    if (result.length == 0) {
                        addHistory(facebookId, "Anonymous");
                    } else {
                        addHistory(facebookId, result.join(", "));
                    }

                    push.sendMessage(msg, device, {}, function(error, response) {
                        console.log(error);
                        console.log(response);
                    });
                }
            })
        }
    })
});

function addHistory(facebookid, friends) {
    var sqlString = "INSERT INTO VisitorHistory (FacebookId, Date, Visitor) VALUES (?, ?, ?)";    
    var date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);

    db.getConnection(function(err, connection) {
       if(err){
           db.releaseConnection(connection);
           callback({status_code: 500, error: { message : "Cannot connect to database" }});
       } else {
           connection.query(sqlString, [facebookid, date, friends], function(err,result){
               db.releaseConnection(connection);
           });
       }
    });
}

module.exports = router;