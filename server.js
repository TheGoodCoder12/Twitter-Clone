require('dotenv').config();
const path=require('path')
const express=require('express')
const port=process.env.PORT||3000
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const AuthRouter=require('./routes/AuthRouter')
require('./Models/db')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'));
app.use('/auth',AuthRouter)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})