require('dotenv').config();
const path=require('path')
const express=require('express')
const port=process.env.PORT||3000
const app=express()

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})