const express = require('express')//server variable
const dotEnv = require("dotenv")//process env variable
const mongoose = require('mongoose')
const app = express()//backend app variable

dotEnv.config()
app.use(express.json())
const studentInfo = require("./schema")

mongoose.connect(`${process.env.MONGOOSE_URL}`)
    .then(() => console.log('mongoose connected...'))

// const studentInfo = require("./schema")

// app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('sever connected...' + PORT)
})

//CRUD OPERATIONS
//create
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, passWord, cf_password, age, phoneNumber } = req.body

    if (!email) {
        return res.status(400).json({ message: "email require" })
    }
    if (age < 18) {
        return res.status(400).json({ message: "can't register" })
    }
    if (cf_password !== passWord) {
        return res.status(400).json({ message: "confirm password " })
    }

    const alreadyRegister = await studentInfo.findOne({ email })
    if (alreadyRegister) {
        return res.status(400).json({ message: "user already existed" })
    }

    const newStudent = new studentInfo({ firstName, lastName, email, passWord, age, phoneNumber })
    await newStudent.save()


    res.status(200).json({ message: 'Registration successful', newStudent })
})


//read
app.get("/students", async (req, res) => {
    const allStudents = await studentInfo.find()

    res.status(200).json({
        message: 'Registration successful',
        count: allStudents.length,
        allStudents
    })
})

//put/patch

app.put("/updateUser/:id", async (req, res) => {
    const { id } = req.params
    const { firstName, lastName } = req.body
    const updateThisUser = await studentInfo.findByIdAndUpdate(id, { firstName, lastName }, { new: true })

    const User = { firstName, lastName }

    res.status(200).json({ message: 'Registration successful', updateThisUser })
})

//delete
app.delete("/delete_studentId/:Id", async (req, res) => {
    const { id } = req.params

    const deleteUser = await studentInfo.findByIdAndDelete(id)

    res.status(200).json({ message: 'Successful' })

})

app.get("/fund_wallet",async (req,res) => {
    const {email, amount} = req.body

    const user = await studentInfo.findOne({email})

    user.walletBalance += Number(amount)
    await user.save()
    res.status(200).json({message:'Successful', user})
})

//get user details wit thier funds
app.get("/getUser_funds/:id", async (req, res) => {
    const { id } = req.params
    // const { email, amount } = req.body

    const user = await studentInfo.findById(id)


    // user.walletBalance += Number(amount)

    // await user.save()

    res.status(200).json({ message: 'Successful', user })
})

