const express= require('express')
const app = express()
const mongoose =require ('mongoose')
const dotenv =require ('dotenv')

dotenv.config()




mongoose.connect(process.env.mongodb_url, {
  ssl: true,
  sslValidate: true,  tlsAllowInvalidHostnames: true,
  tlsAllowInvalidCertificates: true,
  sslCA: `c.pem`
 
}).then(()=>console.log("Sssss"));


app.use(express.json());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);


app.listen(5000,() =>{
    console.log("server is running.....")
})