
const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type:String},
    email: {type:String},
    age:{type:Number},
    phoneNumber: {type: Number}
})

const studentInfo = new mongoose.model('student', Student)

module.exports = studentInfo