const express = require("express")
const router = express.Router()
const { userController, carsController } = require("../app/controller")
const cloudinary = require("./cloudinary")
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "GambarExpress",
    },
});

const upload = multer({ storage: storage });

router.post("/uploud", upload.single("foto"), (req, res) => {
    res.json({ foto: req.file.path })
})


router.get("/", userController.handleGetUser)
router.get("/user?email=email", userController.handleGetUser)
router.post("/register", userController.handlePostUser)
router.put("/update", userController.handleUpdateUser)
router.post("/login", userController.handleLoginUser)

//cars
router.get("/cars", carsController.hadleGetCars)
router.post("/post", upload.single("foto"), carsController.handlePostCars)



module.exports = router