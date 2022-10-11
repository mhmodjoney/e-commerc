const Cart = require("../models/Cart");
const router = require("express").Router();
const {verifyTokenAndAdmin,verifyTokenAndAuthorization, verifyToken,
  verifyTokenAndAuthorizationCart}=require("../routes/jwt_verify");
//add
router.post("/add",verifyToken, async (req, res) => {
    const newCart = new Cart({ 
      userId: req.token_user.id,
      products: req.body.products});
    
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
      }
    catch (err) { return res.status(500).json(err) }
  });


// get all
router.get("/all",verifyTokenAndAdmin, async (req, res) => {
  const u= await Cart.find()
  res.json(u)

});

//get one
router.get("/:id",verifyToken, async (req, res) => {
  // const u= await User.find(_id=req.params.id)
  Cart.findOne({ '_id': req.params.id },function (err, data) {
    if (err) return res.status(500).json(err);
    // Prints "Space Ghost is a talk show host".
 
 
  res.json(data)
  })
});

//update
router.put("/:id",verifyTokenAndAuthorizationCart, async (req, res) => {
try{
      const u =await Cart.findByIdAndUpdate( req.params.id , { $set: req.body }, { new: true });
      res.json(u) 
    }
  catch(err){
    res.status(500).json(err) 
  }


});




//delete
router.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
  try{ 
    const u= await Cart.findOneAndDelete(req.params.id)
    res.json("delted") 
  }
  catch(err){
    res.status(500).json(err)
  }
});



module.exports = router;
