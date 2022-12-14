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
const cartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const sql = require("./sql");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", OrderRoute);
app.use("/sql", sql);



app.listen(process.env.PORT || 5000,() =>{
    console.log("server is running.....")
})