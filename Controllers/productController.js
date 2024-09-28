const products = require('../Models/productModel')

exports.addProduct = async(req,res)=>{
    const {name,category,brand,description,price} = req.body
    const productImage = req.file.filename

    try{
        if(!name || !category || !brand || !description || !price || !productImage){
            res.status(406).json("Please fill the Form Completely")
        }else{
            const newProduct = new products({image:productImage,name,category,brand,description,price})
            newProduct.save()
            res.status(200).json("New product added")
        }
    }catch(error){
      res.status(500).json("Internal Server Error") 
}
}

exports.getProduct = async(req,res)=>{
    try{
        const productDetails = await products.find()
        res.status(200).json(productDetails)
    }
    catch(err){
        res.status(500).json("Internal Server Error")
        console.log(err);
    }
}

exports.editProduct = async(req,res)=>{
    const {id} = req.params    
    const {productImage,name,category,brand,description,price} = req.body
    const uploadedFile = req.file? req.file.filename : productImage

    try{
        if(!uploadedFile || !name || !category || !brand || !description || !price){
        res.status(406).json("Please fill the Form Completely")
    }else{
        const product = await products.findByIdAndUpdate({_id:id},{image:uploadedFile,name,category,brand,description,price},{new:true})
        await product.save()
        res.status(200).json(product)
    }
   }catch(error){
    res.status(500).json("internal Server Error!")
   }
}

exports.deleteProduct = async(req,res)=>{
    
   try{ 
    const {id} = req.params
    const product = await products.findByIdAndDelete(id)    
    res.status(200).json("Product Deleted")
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}

exports.mobileCatogory = async(req,res)=>{  
    const {category} = req.body
    console.log(category);
    try{
        const mobileDetails = await products.find({category})
        res.status(200).json(mobileDetails)
        
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}

exports.productView = async(req,res)=>{
    const {id} = req.params
    try{
        const viewId = await products.findOne({_id:id})
        res.status(200).json(viewId)
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error")
    }
}
