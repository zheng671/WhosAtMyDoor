var aws = require('./aws.js');
var push = require('./pushwoosh.js');



aws.listCollections(function(error, data) {
    // for(var i = 0; i < data.CollectionIds.length; i++) {
    //     aws.deleteCollection(data.CollectionIds[i], function(error, d) {
    //         console.log(d);
    //     });
    // }
    console.log(data);
});

aws.listFace("10213282941484759");
aws.listFace("10214155895960936");

// var registerDeviceOptions = {
//     push_token: "0aa295e7319f5a59d5e49947defd716950bfc5984deb28d59c652ddc3a1d3f97",
//     hwid: "E5F00EBD-BC0E-44C6-B6CA-96881247ED49",
//     language: 'en', // optional, two-letter code ISO-639-1
//     timezone: -3600, // optional, offset in seconds.
//     device_type: 1
// };

// // this will register the device for the client's 'AppCode' application
// push.registerDevice(registerDeviceOptions, function(error, pushres) {
//     console.log(error);
//     console.log(pushres);
// });


var registerDeviceOptions = {
    push_token: "e5RS0DhqpSc:APA91bEEAjNgNQrGIraoe_O57xHCgOVNXP97TJtyO2wvulvAf_5hzWcz30p9NLaqgLtxJk2Ll3PwLWJmiSW5yewX-OPXX6AxPcPdSPUkMLY72wY9RSv2fU2heMfxXifsY0gzQUXQwpC8",
    hwid: "85df02d52586b730",
    language: 'en', // optional, two-letter code ISO-639-1
    timezone: -3600, // optional, offset in seconds.
    device_type: 3
};

// this will register the device for the client's 'AppCode' application
push.registerDevice(registerDeviceOptions, function(error, pushres) {
    console.log(error);
    console.log(pushres);
});