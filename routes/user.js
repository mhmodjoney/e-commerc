const User = require("../models/User");
const router = require("express").Router();
const {verifyTokenAndAuthorization}=require("../routes/jwt_verify");


// get all
router.get("/all", async (req, res) => {
  const u= await User.find()
  res.json(u)

});

//get one
router.get("/:id",verifyTokenAndAuthorization, async (req, res) => {
  // const u= await User.find(_id=req.params.id)
  User.findOne({ '_id': req.params.id },function (err, person) {
    if (err) return res.status(500).json(err);
    // Prints "Space Ghost is a talk show host".
 
 
  res.json(person)
  })
});

//update
router.put("/:id",verifyTokenAndAuthorization, async (req, res) => {
try{
      const u =await User.findByIdAndUpdate( req.params.id , { $set: req.body }, { new: true });
      res.json(u) 
    }
  catch(err){
    res.status(500).json(err) 
  }


});




//delete
router.delete("/:id",verifyTokenAndAuthorization, async (req, res) => {
  try{ 
    const u= await User.findOneAndDelete(req.params.id)
    res.json("delted") 
  }
  catch(err){
    res.status(500).json(err)
  }
});

// stats how many user per month
router.get("/stats", async (req, res) => {

  const date = new Date();
const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
try{ 
const u=  await User.aggregate([
    { $match : { createdAt: {$gte :lastYear} } },
    { $project :   { month: { $month: "$createdAt" },} },
    {  $group: {_id: "$month",total: { $sum: 1 }} }
  ])
  res.status(200).json(u)
}
catch(err){
  res.status(501).json(err)
}
});



module.exports = router;
