const express = require('express')

const app = express()

const PORT = process.env.PORT || 5052

app.listen(PORT, () => {
    console.log(
        'server is running...' + PORT
    )
})

app.get("/", (request, response)=>{
    response.send('welcome to user backend')
})
const users = [{
    "id":"5eb20008/1010",
    "FirstName":"Josh",
    "LastName":"Peter",
    "email":"joshpet@gmail.com"
},
{
    "id":"5eb20008/1210",
    "FirstName":"Seun",
    "LastName":"Kola",
    "email":"mygold@gmail.com"
},
{
    "id":"5eb20008/2300",
    "FirstName":"Bola",
    "LastName":"Temitope",
    "email":"nextjoy@gmail.com"
},
]
app.get("/users", (request, response) => {
    response.json(users)
})