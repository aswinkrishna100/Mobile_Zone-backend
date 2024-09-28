const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    products:[
        {
        productid :{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'products'
        },
        count:{
            type:Number,
            required:true
        }
    }]
})

const cartProducts = mongoose.model('carts',CartSchema)
module.exports = cartProducts
