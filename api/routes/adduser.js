  
const express = require('express')
const router=express.Router();
const mongoose=require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const user=require('../model/user')
const url1=require("url");

router.post("/signup",(req, res) => {

    console.log(req.body.user)
    const newuser= new user({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.user,
      email:req.body.email,
     password:req.body.password,
     salt : "encode"
    });
    crypto.pbkdf2(newuser.password, newuser.salt, 10000, 64, 'sha256', function(err, hashedPassword)
    {
      newuser.password=hashedPassword;
      console.log(newuser.password)
      newuser
      .save()
      .then((result) => {
        console.log("Result: ", result);
        res.status(201).json([
          {
            status: "success",
            message: "User Added",
            data: [newuser],
          },
        ]);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add User",
            error: err,
            data: [],
          },
        ]);
      });
    })
    console.log("in")
  });
  router.post("/login",(req, res) => {

    // console.log(req)
    const username=req.body.email
    let password=req.body.password
    crypto.pbkdf2(password, "encode", 10000, 64, 'sha256', function(err, hashedPassword)
    {
      const newpassword=hashedPassword;
      console.log("login"+newpassword)
      user
      .find({"email" : username})
      .then((result) => {
        console.log("Result: ", result[0].password);
        if (result[0].password==newpassword)
        res.status(201).json([
          {
            status: "success",
            message: "User Added",
            data: result,
          },
        ]);
        else
        {
          res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to find User",
            error: err,
            data: [],
          },
        ]);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add User",
            error: err,
            data: [],
          },
        ]);
      });
    })
    console.log("in")
  });
  
  
  router.get("/", (req,res,err) => {
    console.log("in")
    user.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "user Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch product detail",
            error: err,
            data: [],
          },
        );
      });
    res.send({data:[{id:"done"}]})
  });

  router.put("/", (req,res,err) => {
    console.log("in")
    cart.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "User Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch user detail",
            error: err,
            data: [],
          },
        );
      });
  });
  
  module.exports=router;