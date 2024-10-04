const express = require('express')
const router = new express.Router()
const UserController = require('../Controllers/usercontroller')
const ProductController = require('../Controllers/productController')
const CartController = require('../Controllers/cartController')
const OrderController = require('../Controllers/orderController')
const DeleteController = require('../Controllers/deleteController')
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

// edit User
router.put('/edituser/:id',multerconfig.single('profileImage'),UserController.editUser)

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
router.get('/product-view/:id',ProductController.productView)

// payment 
router.post('/user/order/payment',OrderController.paymentController)

// place orders 
router.post('/user/place-orders/:id',OrderController.placeOrders)

// get orders user
router.get('/user/order-details/:id',OrderController.getOrders)

// delete cart by placing orders
router.delete('/delete-cart-orders/:id',DeleteController.deletecart)

// get orders admin
router.get('/admin/order-details',OrderController.getAdminOrders)

// reset password
router.post('/reset/password',UserController.resetPassword)

// get users to admin
router.get('/user/details',UserController.getUsers)

// set password
router.post('/set/password',UserController.setPassword)

// signIn with google
router.post('/google/SignIn',UserController.googleSignIn)

// payment slip
router.post('/paymentSlip/download',OrderController.paymentSlip)

module.exports = router
