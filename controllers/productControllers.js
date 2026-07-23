const db = require("../database/db")
      
//load products
const getproducts = (req,res,next)=>{

    db.all("select * from Products",function(err,rows){


        if(err){
            return next(err);
           
        }
        
        res.json(rows);

    })


}

//search products
const searchproducts = (req,res,next)=>{

    const name = req.query.name;
    const search = `%${name}%`;

    db.all("select * from Products where name like ?",[search],
        function(err,rows){
            if(err){
                return next(err)
            }
            else{
                res.json(rows);
                console.log("yes");
            }
        })
}

const addproducts = (req,res,next)=>{

    const {name , price , stock} = req.body;
    const query = "insert into Products(name,price,stock) values(?,?,?)";

    db.run(query,[name,price,stock],function(err){
        if(err){
           return next(err);
        }
        else{
            res.status(201).json({message : "added"});
            console.log("added !")
        }

    })




}

module.exports = {getproducts,searchproducts,addproducts};






