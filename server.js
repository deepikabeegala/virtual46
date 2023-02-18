const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const CompainSchema = require('./models/CompainSchema')

const app = express()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/compains").then(()=>{
    console.log("Data base connected successfull")
})


app.get('/deepu',(req,res)=>{
    res.render("login")
})
app.get('/register',(req,res)=>{
    res.render("register")
})
app.get('/login',(req,res)=>{
    res.render("login")
})

app.post("/compain",async(req,res)=>{
    const email = req.body.email
    var password = req.body.password
    const foundUser = await CompainSchema.findOne({ email:email})
    console.log(foundUser)
    password = await bcrypt.compare(password,foundUser.password)
    if(!password) {
        return res.render("error",{error: "invalid email or password"})
    }
    if(foundUser && password) {
        if (foundUser.role === "user") {

            res.render("userside", { user: foundUser })
        } else {
            res.render("adminside", { user: foundUser })

        }
    }else{
        res.render("error",{error: "Oops! User not found"})
    }
})
app.post("/register",async(req,res)=>{
    const email = req.body.email
    var password = req.body.password
    var Password = req.body.Password
    if(Password !== password){
        return res.render("error",{error:"Password didn't match with confirmpassword"})
    }
    const role = req.body.role
    password = await bcrypt.hash(password,10)
    console.log(password)
    const foundUser = await CompainSchema.findOne({ email:email})
    if(!foundUser){
        const newuser = await CompainSchema.create({ email,password,role})
        if(role === "user") {

            res.render("userside", { user: newuser })
        } else {
            res.render("adminside", { user: newuser })

        }
    }else{
        res.render("error",{error: "user already exists!"})
    }
})
app.post("/bookevents",async(req,res)=>{
    res.render("booking")
})
app.post("/success",async(req,res)=>{
    res.render("confirmedevent")
})
app.post("/want",async(req,res)=>{
    res.render("booking")
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})