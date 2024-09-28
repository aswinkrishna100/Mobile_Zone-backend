require('dotenv').config() 
const express = require('express')
const cors = require('cors')
require('./DB/connect')
const router = require('./Routes/router')

const mobilezoneSever = express()
const port = 4000 || process.env.PORT

mobilezoneSever.use(cors())
mobilezoneSever.use(express.json())
mobilezoneSever.use(router)
mobilezoneSever.use('/uploads',express.static('./uploads'))

mobilezoneSever.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

mobilezoneSever.get('/',(req,res)=>{
    res.send('<h1> Server is Running </h1>')
})

