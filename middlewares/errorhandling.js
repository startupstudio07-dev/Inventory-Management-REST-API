const error  =(err,req,res,next)=>{

    if(err){
        console.log(err);

        res.status(500).json({
            success : false,
            message : err.message
        })
    }

}

module.exports = error;