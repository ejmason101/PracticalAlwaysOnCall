const mongoose = require('mongoose');

const registeredUserSchema = mongoose.Schema({
    title: { type: String, required: true },
    lastName: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    uarkEmail: { type: String, required: true},
    trainedOn: { type: String } // this will just be a comma delimited list that contains like lasers,3dprinter,plotter,projector, etc for the types of help sources that are going to be needed
});

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);