const express = require("express")
const app = express()

app.use(express.static("./public"))
app.use(express.json())
const productroutes = require("D:\\Users\\Lhohith\\Desktop\\project1\\routes\\products")
const error  = require("../project1/middlewares/errorhandling");

app.use("/products",productroutes)

app.use(error)
console.log("hello world");


app.listen(3000,()=>{
    console.log("listening")
})