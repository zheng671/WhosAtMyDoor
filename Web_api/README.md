# DoorApp
Final project for team 5 in the Mobile Application development.

The idea of this application is using Amazon rekognition service to detect the visitor's face and compare the face with Facebook friends of registed users to find who is visiting. After the detectio, it will send the notification to the user.

There are two kinds of push notification that the Web API is using: pushwoosh and twilio.

asw.js:         AWS related service including upload image and detect face using rekognition service
login.js:       This service will create user account and registe the device on push notification service
rekognition.js: This service will detect the face and send the notification to the user
visitor.js      This service will get all the recent
pushwoodh.js:   Pushwoosh API
twilio.js:      Twilio API