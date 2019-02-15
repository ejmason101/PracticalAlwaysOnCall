const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Mongoose object that is the users that are in the system
/*
  title: { type: String, required: true },
  lastName: { type: String, required: true},
  phoneNumber: { type: String, required: true},
  uarkEmail: { type: String, required: true},
  trainedOn: { type: String }
*/
const RegisteredUsers = require('./models/registeredTextUser')

let config;
try {
  config = require('./config/config.json');
} catch (ex) {
  console.error('Failed to load config/config.json!');
  console.error('Make sure the file exists.');
  console.error('If you need help, check out the config.example.json file.');
  process.exit(1);
}

const plugins = require('./plugins/index.js');
const app = express();

// Make sure that the connection to the mongod is successful
let mongoURL = 'mongodb://localhost:27017/alwaysoncall';
let port = 8080;
mongoose.connect(mongoURL, {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to Mongodb Instance");
  console.log("Accepting connections to webapp @ port " + port)
}); 





app.use(bodyParser.urlencoded({ extended: false }));

app.post(config.twilio.webhook_path, function(request, response) {

  // Think this was returning false as i was using ngrok. No need to verify
  // const twilioSignature = request.header('X-Twilio-Signature');
  // validTwilioRequest = twilio.validateRequest(
  //   config.twilio.authToken,
  //   twilioSignature,
  //   config.twilio.webhookUrl,
  //   request.body
  // );

  // TODO considering all twilio requests to be valid and truthful
  validTwilioRequest = true;

  if (validTwilioRequest) {
    response.set('Content-Type', 'text/xml');


    // Add middleware to check if the request is valid
    console.log("\n~~~ app.js recieved text from phone number ~~~");
    console.log(request.body.From+ "\n");

    // Search for the matching number
    RegisteredUsers.find( { phoneNumber: request.body.From.toString()})
      .then(results => {
        console.log("\n Results from registered users query");
        console.log(results)


        // Once  verifyed that the person exists within the DB of registered users, let the plugins handle the jazz
        plugins.handle(request.body, response);
      })
      .catch(err => {
        console.log("Error from registeredUsers query");
        console.log(err);
        response.sendStatus(403);

      })

    }  // end if of validTwilioRequest


    

  //   if (!config.twilio.allowedNumbers.includes(request.body.From)) {
  //     console.log(
  //       `Received command from disallowed number ${
  //         request.From
  //       }. Not responding.`
  //     );

  //     const twiml = new MessagingResponse();
  //     response.send(twiml.toString());
  //     return;
  //   }

  //   plugins.handle(request.body, response);
  // } else {
  //   console.log('** validTwilioRequest false ***');
  //   console.log('Received a potentially spoofed request - dropping silently.');
  //   response.sendStatus(403);
  // }
});

app.listen(config.express.port, function() {
  console.log(`TextEverything listening on port ${config.express.port}.`);
});
