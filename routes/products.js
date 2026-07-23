const express = require("express")
const validate = require("../middlewares/validatormiddleware")

const router = express.Router()

const {getproducts,searchproducts,addproducts} = require("../controllers/productControllers");


router.get("/",getproducts)
router.get("/search",searchproducts)
router.post("/",validate,addproducts)


module.exports = router

