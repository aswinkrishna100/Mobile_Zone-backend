const cartProducts = require("../Models/cartModel")

exports.addcart = async(req,res)=>{
    const {id} = req.params
    const {productid,count} = req.body

    try{
       if(!productid || !id || !count){
        res.status(406).json('please add productid,count and userid')
       }else{
            const cart = await cartProducts.findOne({userid:id})            
            if(cart){
                const product = cart.products.find(item=>item.productid == productid)
                if(product){
                    product.count += 1
                }else{
                    cart.products.push({productid,count})
                }
                cart.save()
                res.status(200).json("Product Add on Cart")
            }else{
               const cart = new cartProducts({
                userid:id,
                products:[{productid,count}]
               })
               cart.save()
               res.status(200).json("New Cart Created and Product Added")
            }
       }
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}

exports.getcart = async(req,res)=>{
    const {id} = req.params
    try{
        const productDetails = await cartProducts.findOne({userid:id}).populate('products.productid', 'category name description price image')
        if(productDetails){
            res.status(200).json(productDetails)
         }
    }
    catch(err){
        console.log(err); 
        res.status(500).json("Internal Server Error") 
    }
}

exports.deletecart = async(req,res)=>{
    const {id} = req.params
    const {productid} = req.body
    try{
        if(!id){
            res.status(404).json("User Not Found")
        }else{
            const cart = await cartProducts.findOne({userid:id})
            if(cart){
               cart.products = cart.products.filter(item=>item.productid != productid)
                cart.save()
                res.status(200).json("Cart Product Deleted")
            }            
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}
