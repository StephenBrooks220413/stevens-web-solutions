const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    name: String,
    email: String,
    message: String,
    dateSent: {
        type: Date,
        default: new Date()
    }
})

const ContactForm = mongoose.model('ContactForm', ContactFormSchema)
module.exports = ContactForm