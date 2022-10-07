const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC).toString() ,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if("username" in err.keyPattern){return res.status(500).json("username alrady exists")}
    if("email" in err.keyPattern){return res.status(500).json("email alrady exists")}
    
    return res.status(500).json(err)
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try
    {
        const  user= await User.findOne({username:req.body.username })
       
        if(!user) return res.status(402).json("no user with this name")

     
        const hashpass= CryptoJS.AES.decrypt(user.password, process.env.AES_SEC).toString(CryptoJS.enc.Utf8) 
       if( hashpass != req.body.password) return  res.status(401).json("rong password")

       const { password, ...others } = user._doc;  
       const user_token= jwt.sign( {
        id: user._doc._id,
        isAdmin: user._doc.isAdmin,
    },
    process.env.TOKEN_SEC,
        {expiresIn:"3d"})
     console.log(req.body)
        return res.status(200).json({...others,"token":user_token})
        }
    catch(err){
        return res.status(400).json(err)
    }
});

module.exports = router;
