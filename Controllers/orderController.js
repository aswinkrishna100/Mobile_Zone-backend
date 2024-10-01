const Razorpay = require("razorpay")
const orderProducts = require("../Models/orderModel")

exports.paymentController = async(req,res)=>{
    const {amount} = req.body
    try{
        const razorpay = new Razorpay({
            key_id : process.env.KEY_ID,
            key_secret : process.env.key_secret
        })

        const options = {
            amount,
            currency : 'INR'
        }

        const response = await razorpay.orders.create(options)
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}


exports.placeOrders = async(req,res)=>{
    const {id} = req.params
    const {productid,payment_id,amount,address} = req.body
    
    try{
        const order = new orderProducts({
            userid : id,
            payment_id ,
            amount,
            address,
            products:productid.map(productid => ({ productid }))
        })

        order.save()
        res.status(200).json(order)
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    } 
}

exports.getOrders = async(req,res)=>{
    const {id} = req.params
    
    try{
        const orderDetails = await orderProducts.find({userid:id}).populate('products.productid','name image price')
        if(orderDetails){
            res.status(200).json(orderDetails)
         }
         
    }
    catch(err){
        console.log(err); 
        res.status(500).json("Internal Server Error") 
    }
}

exports.getAdminOrders = async(req,res)=>{
    try{
     const orderDetails = await orderProducts.find().populate('userid' , 'fname lname email address').populate('products.productid' , 'name image')
     res.status(200).json(orderDetails)
   }
   catch(err){
     res.status(500).json("Internal Server Error")
     console.log(err);
   }
 }
