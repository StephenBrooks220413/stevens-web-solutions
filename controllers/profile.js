const User = require('../models/Users')

module.exports = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('profile', {
        user
    })
}