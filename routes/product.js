const product = require("../models/Product");
const router = require("express").Router();
const {verifyTokenAndAdmin,verifyTokenAndAuthorization}=require("../routes/jwt_verify");
//add
router.post("/add",verifyTokenAndAdmin, async (req, res) => {
    const newProd = new product(req.body);
    
    try {
        const savedUser = await newProd.save();
        res.status(201).json(savedUser);
      } catch (err) {
        if("title" in err.keyPattern){return res.status(500).json("title alrady exists")}
        // if("email" in err.keyPattern){return res.status(500).json("email alrady exists")}
        
        return res.status(500).json(err)
      }
  });


// get all
router.get("/all", async (req, res) => {
  const u= await product.find()
  res.json(u)

});

//get one
router.get("/:id", async (req, res) => {
  // const u= await User.find(_id=req.params.id)
  product.findOne({ '_id': req.params.id },function (err, data) {
    if (err) return res.status(500).json(err);
    // Prints "Space Ghost is a talk show host".
 
 
  res.json(data)
  })
});


//update
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
try{
      const u =await product.findByIdAndUpdate( req.params.id , { $set: req.body }, { new: true });
      res.json(u) 
    }
  catch(err){
    if("title" in err.keyPattern){return res.status(500).json("title alrady exists")}
    res.status(500).json(err) 
  }
});




//delete
router.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
  try{ 
    const u= await product.findOneAndDelete(req.params.id)
    res.json("delted") 
  }
  catch(err){
    res.status(500).json(err)
  }
});



module.exports = router;
