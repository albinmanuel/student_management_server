require('dotenv').config()

const express=require('express')

const cors=require('cors')

const db=require('./DB/connection')
const router=require('./Routes/router')

const stdmngServer=express()

stdmngServer.use(cors())
stdmngServer.use(express.json())
stdmngServer.use(router)

const PORT=4000 || process.env.PORT

stdmngServer.listen(PORT,()=>{
    console.log('serverApp running on port ' +PORT)
})

stdmngServer.get('/',(req,res)=>{
    res.send('Welcome to Student Management Backend')
})