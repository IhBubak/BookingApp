const express = require("express")
const app = express()
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const User = require("./models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("dotenv").config()


app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())

mongoose.connect(process.env.mongoUrl)

app.get("/test", (req, res) => {
    res.json("test ok")
})
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(12))
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userDoc = await User.findOne({ email })
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, process.env.jwtKey, { expiresIn: "2h" }, (er, token) => {
                    if (er) console.log(er)
                    res.cookie("token", token, { sameSite: "none", secure: "true" }).status(201).json(userDoc)
                })
            }
            else {
                res.status(422).json("wrong password")
            }
        }
    } catch (e) {
        console.log(e)
    }
})
app.get("/profile", (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.jwtKey, {}, async (er, userData) => {
            if (er) console.log(er)
            const { name, email, _id } = await User.findById(userData.id)
            res.json({name, email, _id})
        })
    }
    else {
        res.json(null)
    }
})
app.post("/logout", async(req, res)=>{
    res.cookie("token", "").json(true)
})

app.listen(4000, () => {
    console.log("app Listen on Port 4000...")
})