const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    payment_id :{
        type:String,
        required:true
    },

    amount :{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    products:[
        {
        productid :{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'products'
        }
    }],
    status:{
        type:String,
        enum:['Pending','Processing','Completed','Cancelled'],
        default:'Pending'
    },
    orderDate:{
        type:Date,
        default: Date.now()
    }
})

const orderProducts = mongoose.model('orders',OrderSchema)
module.exports = orderProducts
