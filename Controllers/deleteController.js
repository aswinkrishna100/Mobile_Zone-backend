const cartProducts = require("../Models/cartModel")

exports.deletecart = async(req,res)=>{
    const {id} = req.params
    try{
        const cart = await cartProducts.findOneAndDelete({userid:id})
        res.status(200).json("Order Placed") 
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}
