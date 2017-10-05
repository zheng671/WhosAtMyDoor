// Load the SDK and UUID
var AWS = require('aws-sdk');

var rekognition = new AWS.Rekognition({ region: 'us-east-1' });
var s3Bucket = new AWS.S3( { params: { Bucket: '08723-team5' } } );

var rekService = {};

/**
 * Create a new friends image collection
 * 
 * @param {String} collection - the unique collection name for the user
 */
rekService.createCollection = function(collection, callback) {
  rekognition.createCollection({ CollectionId: collection }, function(err, data) {
      callback(err);
  });
};

rekService.listFace = function(collection) {
   var params = {
    CollectionId: collection, 
    MaxResults: 20
  };
  rekognition.listFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

/**
 * Create a new friends image collection
 * 
 * @param {String} collection - the unique collection name for the user
 */
rekService.deleteCollection = function(collection, callback) {
  rekognition.deleteCollection({ CollectionId: collection }, function(err, data) {
      callback(err);
  });
};

/**
 * Create a new friends image collection
 * 
 * @param {String} collection - the unique collection name for the user
 */
rekService.listCollections = function(callback) {
  rekognition.listCollections({}, function(err, data) {
      callback(err, data);
  });
};

/**
 * Upload image to Rekognition and detect friends face
 * 
 * @param {String} collection - The image collection that the user belongs to
 * @param {String} imageId - The unique id to identify friend face
 * @param {String} imageName - The image name in S3 bucket
 */
rekService.uploadFace = function(collection, imageId, image, callback) {
  var params = {
    CollectionId: collection, 
    DetectionAttributes: [
    ], 
    ExternalImageId: imageId,
    Image: {
      Bytes: image
    }
  };
  rekognition.indexFaces(params, function(err, data) {
    callback(err);
  });
};

/**
 * 
 * @param {String} collection - The image collection that the user belongs to
 * @param {String} imageName - The image name in S3 bucket
 */
rekService.detectFace = function(collection, imageName, callback) {
  var params = {
  CollectionId: collection, 
  FaceMatchThreshold: 70, 
  Image: {
    S3Object: {
      Bucket: "08723-team5", 
      Name: imageName
    }
  }, 
  MaxFaces: 5
  };
  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var faces = data["FaceMatches"];
      var result = [];
      if (faces.length > 0) {
        for (var i = 0; i < faces.length; i++) {
          result.push(faces[i]["Face"]["ExternalImageId"])
        }
      }
    }
    callback(err, result);
  });
};

module.exports = rekService;