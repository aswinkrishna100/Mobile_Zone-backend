const express = require('express')
const router = new express.Router()
const UserController = require('../Controllers/usercontroller')
const ProductController = require('../Controllers/productController')
const CartController = require('../Controllers/cartController')
const jwtAuthorizathion = require('../middlewares/jwtMiddlewares')
const multerconfig = require('../middlewares/multerMiddleware')

// add user
router.post('/adduser',UserController.addUser)

// otp verification
router.post('/verifieduser',UserController.verifiedOtp)

// resend OTP
router.post('/resendotp',UserController.resendOtp)

// user login
router.post('/loginuser',UserController.loginUser)

// get User
router.get('/getuser',UserController.getUser) 

// add product - admin
router.post('/admin/add-product',jwtAuthorizathion,multerconfig.single('productImage'),ProductController.addProduct)

// get product - admin
router.get('/admin/get-product',jwtAuthorizathion,ProductController.getProduct)

// edit product - admin
router.put('/admin/edit-product/:id',jwtAuthorizathion,multerconfig.single('productImage'),ProductController.editProduct)

// delete product - admin
router.delete('/admin/delete-product/:id',jwtAuthorizathion,ProductController.deleteProduct)

// get mobile category 
router.get('/get-mobile',ProductController.mobileCatogory)

// product add to cart
router.post('/add-cart/:id',CartController.addcart)

// product get in cart
router.get('/get-cart/:id',jwtAuthorizathion,CartController.getcart)

// product delete from cart
router.post('/delete-cart/:id',CartController.deletecart)

// product view 
router.post('/product-view/:id',ProductController.productView)

module.exports = router
