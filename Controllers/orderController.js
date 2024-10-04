const Razorpay = require("razorpay")
const orderProducts = require("../Models/orderModel")
const PDFDocument = require('pdfkit')

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

 exports.paymentSlip = async(req,res)=>{
    const {payment_id} = req.body

    const razorpay = new Razorpay({
        key_id : process.env.KEY_ID,
        key_secret : process.env.key_secret
    })
    try{        
        const payment = await razorpay.payments.fetch(payment_id)
        const doc = new PDFDocument()
        res.setHeader('Content-Type','application/pdf')
        res.setHeader('Content-Disposition',`attachment; filename=reciept=${payment_id}.pdf`)
        doc.pipe(res)
        doc.fontSize(20).text('Payment Reciept' , {align:'center'})
        doc.moveDown();
        doc.fontSize(12).text(`Payment ID: ${payment_id}`);
        doc.text(`Order ID: ${payment.order_id}`);
        doc.text(`Amount: ${payment.amount / 100}`); 
        doc.text(`Status: ${payment.status}`);
        doc.text(`Method: ${payment.method}`);
        doc.text(`Email: ${payment.email}`);
        doc.text(`Contact: ${payment.contact}`);
        doc.end()
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
 }
