const storeContactForm = require('../models/ContactForm');

module.exports = async (req, res) => {
    await storeContactForm.create(req.body)
    res.redirect('/')
}
