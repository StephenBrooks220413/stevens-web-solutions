const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Provide An Email, we will never share it']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please Provide A Username']
    },
    password: {
        type: String,
        required: [true, 'Please Provide A Username']
    },
    about: {
        type: String,
        required: [true, 'Please Talk About Yourself']
    },
    dateJoined: {
        type: Date,
        default: new Date()
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash
        next()
    })
})

const Users = mongoose.model('Users', UserSchema)
module.exports = Users