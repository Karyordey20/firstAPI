const express = require('express')//server variable
const dotEnv = require("dotenv")//process env variable
const mongoose = require('mongoose')
const app = express()//backend app variable

dotEnv.config()
app.use(express.json())
const studentInfo = require("./schema")

mongoose.connect(`${process.env.MONGOOSE_URL }`)
.then(() => console.log('mongoose connected...'))

// const studentInfo = require("./schema")

app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('sever connected...' + PORT)
})

app.post("/students", async (req, res) => {
    const {firstName,lastName,email, age,phoneNumber} = req.body

    if(!email){
       return res.status(400).json({message: "email require"})
    }
    const alreadyExisted = await studentInfo.findOne({email})
    if(alreadyExisted){
        return res.status(400).json({message:'user already existed'})
    }
    const newStudent  = new studentInfo({firstName,lastName,email, age,phoneNumber})

    await newStudent.save()

     res.status(200).json({
        message:'successful',
        user: newStudent
    })

})

app.get("/students", async (req,res)=>{
    const findAll = await studentInfo.find()

    return res.status(200).json({
        message:"sucessful",
        count:findAll.length,
        user: findAll,
    })
})


