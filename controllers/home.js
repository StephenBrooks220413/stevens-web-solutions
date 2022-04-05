const Review = require('../models/Review')

module.exports = async (req, res) => {
    const reviews = await Review.find({}).limit(4).sort({_id: -1})
    console.log(req.session)
    res.render('index', {
        reviews
    })
}