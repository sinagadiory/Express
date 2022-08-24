const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const router = require("../config/router")
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

module.exports = app
