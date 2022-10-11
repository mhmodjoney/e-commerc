const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SEC, (err, token_user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.token_user = token_user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };


  const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.token_user.id === req.params.id || req.token_user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.token_user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  const verifyTokenAndAuthorizationCart =  (req, res, next) => {
    verifyToken(req, res, async () => {
      const req_cart= await Cart.findByIdAndUpdate( req.params.id )
     const user_id_for_cart =req_cart.userId


      if (req.token_user.id === "6342b86681582a04eafa2346" || req.token_user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,verifyTokenAndAuthorizationCart
  };
  