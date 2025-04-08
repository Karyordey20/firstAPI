
const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    firstName: {type: String, require},
    lastName: {type:String, require},
    email: {type:String, require},
    passWord:{type:String, require},
    age:{type:Number, require, require},
    phoneNumber: {type: Number, require},
    walletBalance:{type:Number, default: 0}
})

const studentInfo = new mongoose.model('student', Student)

module.exports = studentInfo