const Order = require("../models/Order");
const router = require("express").Router();
const {verifyTokenAndAdmin,verifyTokenAndAuthorization}=require("../routes/jwt_verify");
//add
router.post("/add", async (req, res) => {
    const newOrder = new Order({ 
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price });
    
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
      } catch (err) {
        // if("username" in err.keyPattern){return res.status(500).json("username alrady exists")}
        // if("email" in err.keyPattern){return res.status(500).json("email alrady exists")}
        
        return res.status(500).json(err)
      }
  });


// get all
router.get("/all", async (req, res) => {
  const u= await Order.find()
  res.json(u)

});

//get one
router.get("/:id", async (req, res) => {
  // const u= await User.find(_id=req.params.id)
  Order.findOne({ '_id': req.params.id },function (err, data) {
    if (err) return res.status(500).json(err);
    // Prints "Space Ghost is a talk show host".
 
 
  res.json(data)
  })
});

//update
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
try{
      const u =await Order.findByIdAndUpdate( req.params.id , { $set: req.body }, { new: true });
      res.json(u) 
    }
  catch(err){
    res.status(500).json(err) 
  }


});




//delete
router.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
  try{ 
    const u= await Order.findOneAndDelete(req.params.id)
    res.json("delted") 
  }
  catch(err){
    res.status(500).json(err)
  }
});



module.exports = router;
