const express = require('express')
const jwt = require('jsonwebtoken');

const LoginRoute = express.Router();
var bcrypt = require('bcryptjs');

let User = require('../model/login');

LoginRoute.post('/register', async (req, res) => 
{
    try {
        
        const { UserName,  PassWord } = req.body;
    
        if (!(UserName && PassWord )) {
          res.status(400).send("All input is required");
        }
    
        const oldUser = await User.findOne({ UserName });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        const user = await User.create({
            UserName,
            PassWord,
        });
    
        // const token = jwt.sign(
        //   { user_id: user._id, UserName },
        //   process.env.TOKEN_KEY,
        //   {
        //     expiresIn: "2h",
        //   }
        // );
        
        // user.token = token;
    
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
    
   
})


LoginRoute.post('/login', async (req, res) =>   
{
  try {
    const { UserName, PassWord } = req.body;

    if (!(UserName&&PassWord)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ UserName });
    const userp = await User.findOne({ PassWord });

    if (user && userp) 
    {
        const token = jwt.sign({ 
        user_id: user._id, UserName },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        });

      user.token = token;
      res.status(200).json(user);
    }else{
      res.status(400).send("Invalid Credentials");
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = LoginRoute;