# AlwaysOnCall

This is a texting bot app that uses the Twilio API to send out a text message, when someone presses a button asking for help, to all qualified people. First person to respond will be the person that is on campus and is closest to helping.
- - -

## API Inforamtion
1. Node.js
2. Twilio API
3. Node server running on an openshift pod on the dev OpenShift Uark server


## Abstract
Currently the tech help dept. has people sitting in the plotting lab for hours on end and usually they get a low quantity of users. 
This texting bot app would take the place as a 'help' button, probably a RPI or ESP device that will send a webhook to the API server

This server will send out a text message to a corresponding list of studentworkers/staff

The first person to repond will be assigned to the job - texting back to the alert text will move you to the active person

If no response, we can have emergency texts/calls be sent out to the 'admin' group of people

The initial webhook should actually have an input so the requester can pass their phone number. Then they can be updated/contacted by the responding student to facilitate their needs.

Incentives could be like half an hour minimum to be logged to your hour log

## Details

* add `help` if someone texts for list of responses/how to use the texting bot
* TODO maybe make a webapp interface?
* integrate this texting bot to the FJLRS