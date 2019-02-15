/*
   Executed if the command 'register' is recieved
   
   Command valid paths

   register Elliot Mason, ejmason@uark.edu --> {
       firstName: ,
       lastName: ,
       email: ,
       phoneNumber: +1....
   }
    -- Will create a user associated with this phone number in the db with the email passed

    Not sure if this will be intertwined with the app, but i already have the phone number there

*/

const MessagingResponse = require('twilio').twiml.MessagingResponse

const methods = {
    run: function(request, response) {
        // Strip the trigger word from the response.
        const message = request.Body.split(' ').slice(1).join(' ')
        console.log(request);

        // If the command is  `register help` then 
        if (request.Body == "Register help") {
            const twiml = new MessagingResponse();
            let message = "To Register a name and email to this phone number, respond with a text message formatted: \n \'register FirstName LastName youruarkemail@email.uark.edu\'"

            twiml.message(message);
            response.set('Content-Type', 'text/xml')
            response.send(twiml.toString())
        } else {
            // The command is not 'register help' or 'Register Help'

            // Verify that the passed command has a 
            // firstName
            // lastName
            // uarkEmail!

            // slice n dice

            let recievedCommand = request.Body.split(' ').splice(1)
            console.log(recievedCommand)

            let firstName = recievedCommand[0]
            let lastName = recievedCommand[1]

            // need to make sure that the email is formatted as @email.uark.edu
            let uarkEmail = recievedCommand[2]

            



            const twiml = new MessagingResponse()

            // Add the message to it, and send it back to Twilio.
            // twiml.message(message)
            // response.set('Content-Type', 'text/xml')
            // response.send(twiml.toString()) 
        }
        // Figure out how to parse efficiently

        //  Make a mongoose object

        // Save to mongod  -- Get mongod connection check in the app.js 

        // if failed, say why

        // if successful, send text back 

        // Create a new response object to send to Twilio.
        
    },
  
    meta: {
      aliases: ['register']
    }
  };
  
  module.exports = methods;
  