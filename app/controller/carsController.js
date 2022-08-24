const fs = require("fs")
const file = fs.readFileSync("app/models/cars.json", "utf-8")
const dataCars = JSON.parse(file)

const hadleGetCars = (req, res) => {
    const cars = dataCars
    res.render("cars", { cars })
}

const handlePostCars = async (req, res) => {
    const { nama_mobil, harga } = req.body
    const data = await {
        foto: req.file.path,
        id: dataCars.length + 1, nama_mobil, harga,
    }
    await dataCars.push(data)
    await fs.writeFileSync("app/models/cars.json", JSON.stringify(dataCars))
    const cars = dataCars
    res.render("cars", { cars })
}


module.exports = { hadleGetCars, handlePostCars }