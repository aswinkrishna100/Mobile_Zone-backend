const jwt = require('jsonwebtoken')

const jwtAuthorizathion = async(req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    try{
        const verifiedToken = jwt.verify(token,'supersecretkey12345')
        console.log(verifiedToken);
        next()
    }
    catch(err){
        res.status(401).json('Unauthorized Access')
    }
}

module.exports = jwtAuthorizathion
