const fs = require("fs")
let file = fs.readFileSync("app/models/user.json", "utf-8")
const dataUser = JSON.parse(file)

const bcrypt = require("bcrypt")

const handleGetUser = async (req, res) => {
    // res.json(dataUser)
    const users = dataUser
    res.render("index", { users })
}

const handleGetOneUser = (req, res) => {
    const user = dataUser.find((user) => (user.email == req.query.email))
    res.json(user)
}

const handlePostUser = async (req, res) => {
    const { nama, email, password, confpassword } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    const data = {
        id: dataUser.length + 1, nama, email, password: hashpassword
    }
    const cekUser = dataUser.find((user) => user.email == email)
    if (cekUser != null) {
        res.json({ msg: "Email Sudah Terdaftar" })
        return
    }
    if (password != confpassword) {
        res.json({ msg: "Password dan ConfPassword Tidak Sama" })
        return
    }
    dataUser.push(data)
    fs.writeFileSync("app/models/user.json", JSON.stringify(dataUser))
    const user = dataUser
    res.render("index", { users: user })
}

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body
    const user = dataUser.find((user) => user.email == email)
    if (user == null) {
        res.json({ msg: "Email dan Password Tidak Cocok" })
        return
    }
    const cekPassword = await bcrypt.compare(password, user.password)
    if (!cekPassword) {
        res.json({ msg: "Email dan Password Tidak Cocok" })
        return
    }
    res.json({ msg: `Selamat Datang ${user.nama}` })
}

const handleUpdateUser = async (req, res) => {
    const { nama, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    dataUser.map((user) => {
        if (user.email == req.query.email) {
            user.nama = nama
            user.email = email
            user.password = hashpassword
        }
    })
    fs.writeFileSync("app/models/user.json", JSON.stringify(dataUser))
    const user = await dataUser.find((user) => user.email == req.query.email)
    res.json(user)
}

module.exports = {
    handleGetUser, handlePostUser, handleUpdateUser, handleLoginUser, handleGetOneUser
}