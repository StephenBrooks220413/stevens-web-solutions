const Users = require('../models/Users')
const message = require('./deleteProfile')

module.exports = async (req, res) => {
    const users = await Users.find({}).limit(30).sort({_id: -1})
    console.log(req.session)
    res.render('profiles', {
        message,
        users
    })
}