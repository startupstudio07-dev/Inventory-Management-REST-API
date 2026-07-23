const productSchema  = require("../validators/productvalidators")

const validate = (req,res,next)=>{
    const validation = 
    productSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({errors : validation.error.issues})

    }

    req.body = validation.data
    next();
}


module.exports = validate