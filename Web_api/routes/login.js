var express = require('express');
var FB = require('fb');
var router = express.Router();
var User = require('../models/User');
var aws = require('./aws.js');
// var push = require('./pushwoosh.js');
var twilio = require('./twilio.js');
var request = require('request').defaults({ encoding: null });

/* GET home page. */
router.get('/', function(req, res, next) {
    var accessToken = req.headers.accesstoken;
    var useMode = req.headers.usemode;
    var deviceOS = req.headers.deviceos;
    var hwid = req.headers.hwid;
    var devicetoken = req.headers.devicetoken;

    if(accessToken === undefined || accessToken === ''){
        res.send({ error : { message: "Please attach access token."} });
        res.send(obj);
    } else {
        url = "/me";
        FB.options({version:'v2.10'});
        FB.setAccessToken(accessToken);
        FB.api(url, function(response) {
            if(response && !response.error) {
                var FacebookId = response.id;
                console.log(FacebookId);
                var username = response.name;
                var user = new User({
                    FacebookId: FacebookId,
                    AccessToken: accessToken,
                    UseMode: useMode,
                    DeviceOS: deviceOS,
                    Username: username,
                    DeviceID : hwid,
                    DeviceToken : devicetoken
                });
                
                user.FindUserByID(function(response) {
                    if (!response.user || response.user.length == 0) {
                        user.InsertIfNotPresent(function(response){
                            res.send(response);
                        });

                        aws.createCollection(FacebookId, function(err) {
                            if (!err) {
                                console.log("Collection " + FacebookId + " created");
                                addFriend(FacebookId);
                            } else {
                                console.log(err);
                            }
                        });
                    } else {
                        user.Update(function(response){
                            res.send(response);
                        });
                    }
                });

                var registerDeviceOptions = {
                    push_token: devicetoken,
                    hwid: hwid,
                    language: 'en', // optional, two-letter code ISO-639-1
                    timezone: -3600 // optional, offset in seconds
                };
                
                if (deviceOS.toLocaleLowerCase() == 'ios') {
                    registerDeviceOptions.device_type = 1;
                } else if (deviceOS.toLocaleLowerCase() == 'android') {
                    registerDeviceOptions.device_type = 3;
                }

                // this will register the device for the client's 'AppCode' application
                // push.registerDevice(registerDeviceOptions, function(error, pushres) {
                //     console.log(error);
                //     console.log(pushres);
                // });
                twilio.bindings.create({
                    identity: FacebookId,
                    bindingType: deviceOS.toLocaleLowerCase() == 'ios' ? 'apn' : 'gcm',
                    address: devicetoken
                  }).then(function(binding) {
                    console.log(binding);
                  }).catch(function(error) {
                    console.log(error);
                  });

                
            } else {
                res.send({ status_code: 500, error : { message: "Cannot read user information"} });
            }
        });
    }
});

function addFriend(userId, accessToken) {
    var url = "/me/friends";
    FB.api(url, { "limit": 100 }, function (response) {
        console.log(response);
        if (response && !response.error) {
            if(response.data === undefined || response.data.length === 0) {
                console.log("No data found");
            }
            else {
                // facebook has pagination, this will only get part of friends
                for (i = 0; i < response.data.length; ++i) {
                    var friend = response.data[i];
                    request.get("http://graph.facebook.com/" + friend.id + "/picture?type=large", 
                        { "friendName": friend.name.replace(" ","_") } , function (error, res, body) {
                        if (!error && res.statusCode == 200) {
                            aws.uploadFace(userId, res.request["friendName"], new Buffer(body), function(error) {
                            });
                        }
                    });
                }
            }
        }
    });
}

module.exports = router;