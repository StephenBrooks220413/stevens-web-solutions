const Profile = require('../models/Users')

module.exports = (req, res, next) => {
    const message = "Deleted"
    Profile.deleteOne({_id: req.params.id}).then(
        () => {
            res.render(
                'profiles',
                message
            );
        },
    ).catch(
        (error) => {
            res.render(
                'profile',
                console.log(error)
            );
        }
    );
};