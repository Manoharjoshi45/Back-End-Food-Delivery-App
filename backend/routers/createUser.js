const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret ="ThisisSecretText";


router.post("/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const salt = await bcrypt.genSalt(10);
   let setPassword = await bcrypt.hash(req.body.password,salt) 

    try {
      await User.create({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (e) {
      console.log(e);
      return res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   const email=req.body.email
    try{
    const userFound= await User.findOne({email})
    if(!userFound){
      return res.status(400).json({errors:"Error in logging"})
    }
    const pwdCompare =await bcrypt.compare(req.body.password,userFound.password)
    if(!pwdCompare){
      return res.status(400).json({errors:"Error in logging"})
    }  
    const data = {
        user:{
          id:userFound.id
        }
    }
    const authToken = jwt.sign(data,jwtSecret)
   
      return res.json({ success:true,authToken :authToken})
    }
    catch(e){
      console.log(e)
      res.json({success:false});
    }
   
  }
);

module.exports = router;
