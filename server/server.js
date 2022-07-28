const express = require("express")

const app = express()
const PORT = 5500

app.get("/",(req,res)=>{
    res.json({
        greet: "Hello world"
    })
})

app.listen(PORT,()=>{
    console.log("Started server at port ",PORT)
})