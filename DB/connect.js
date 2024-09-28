const mongoose = require('mongoose')
const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Connected");
}).catch((error)=>{
    console.log("DataBase Connection Error",error);
})
