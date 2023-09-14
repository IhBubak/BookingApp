const express = require("express")
const app = express()
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const User = require("./models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const imageDownloader = require("image-downloader")
const multer = require("multer")
const fs = require("fs")
const Place = require("./models/Place.js")
require("dotenv").config()

//to get and see all uploaded photos for the user
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
const photosMiddleware = multer({ dest: "uploads" })

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
            res.json({ name, email, _id })
        })
    }
    else {
        res.json(null)
    }
})
app.post("/logout", async (req, res) => {
    res.cookie("token", "").json(true)
})
app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body
    const newName = "photo" + Date.now() + ".jpg"
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName
    })
    res.json(newName)
})
app.post("/upload", photosMiddleware.array("photos", 20), async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const ext = originalname.split(".")[1]
        const newPath = path + "." + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads\\", ""))
    }
    res.json(uploadedFiles)
})
app.post("/places", async (req, res) => {
    const { token } = req.cookies
    const { title, adress, addedPhotos, description, perks, extraInfos, checkIn, checkOut, maxGuests } = req.body
    jwt.verify(token, process.env.jwtKey, {}, async (er, userData) => {
        if (er) console.log(er)
        const placeDoc = await Place.create({
            owner: userData.id,
            title: title,
            address: adress,
            photos: addedPhotos,
            description: description,
            perks: perks,
            extraInfo: extraInfos,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests
        })
        res.json(placeDoc)
    })
})
app.get("/places", async (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, process.env.jwtKey, {}, async (er, userData) => {
        if (er) console.log(er)
        const { id } = userData
        res.json(await Place.find({ owner: id }))
    })
})
app.get("/places/:id", async (req, res) => {
    const { id } = req.params
    res.json(await Place.findById(id))
})
app.put("/places/:id", async (req, res) => {
    const { id } = req.params
    const { token } = req.cookies
    const {
        title, adress, addedPhotos, description,
        perks, extraInfos, checkIn, checkOut, maxGuests
    } = req.body
    jwt.verify(token, process.env.jwtKey, {}, async (er, userData) => {
        const placeDoc = await Place.findById(id)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                owner: userData.id,
                title: title,
                address: adress,
                photos: addedPhotos,
                description: description,
                perks: perks,
                extraInfo: extraInfos,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests
            })
            await placeDoc.save()
            res.json("ok")
        }
    })

})

app.listen(4000, () => {
    console.log("app Listen on Port 4000...")
})