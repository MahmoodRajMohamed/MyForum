  
const express = require('express')
const router=express.Router();
const mongoose=require('mongoose');
const posts=require('../model/story')
const comment=require('../model/comment')
const url1=require("url");

router.get("/:id",(req,res)=>{
  var pid=req.params.id;
  console.log("in")
  console.log(pid)

posts.find({by:pid}).exec().then((docs)=>{
  if(docs)
  {
    res.status(200).json({
      status: "success",
      message: "posts Details",
      count: docs.length,
      data:docs,
    })
  }
  else{
    res.status(200).json([{
      status: "success",
      message: "posts not found",
      count: 0,
      data: [],
    }])
  }
})  
})

router.post("/",(req, res) => {
    var maxid;
    posts.findOne().sort({id:-1}).exec().then((data)=>{
    if(data)
    {
      maxid=data.id
    }
    else{
      maxid=0
    }
    const newposts= new posts({
      _id: new mongoose.Types.ObjectId(),
      by:req.body.by,
      kids:[],
      score:0,
      title:req.body.title,
      time:Date.now(),
      desc:req.body.desc,
      id:maxid+1
    });
    console.log("in")
    newposts
      .save()
      .then((result) => {
        console.log("Result: ", result);
        res.status(201).json(
          {
            status: "success",
            message: "posts Added",
            data: newposts,
          },
        );
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add posts",
            error: err,
            data: [],
          },
        ]);
      }) });
  });

  router.get("/", (req,res,err) => {
    console.log("ein")
    posts.find()
      .sort({score:-1})
      .exec()
      .then((docs) => {
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "posts Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "posts not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch posts detail",
            error: err,
            data: [],
          },
        );
      });
  });

  router.put("/", (req,res,err) => {
    console.log(req.body.score)
    var id1=req.body.id;
    var user=req.body.user
    var score=req.body.score
    //vote length is enough for count
    posts.updateOne({id:id1},{$push:{vote:user}})
      .exec()
      .then((docs) => {
        posts.updateOne({id:id1},{score:score}).exec().then((docs)=>{
        console.log(docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "posts Details",
            count: docs.length,
            data:docs
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "posts not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch posts detail",
            error: err,
            data: [],
          },
        );
      });
  }).catch(err=>{
    res.status(500).json(
      {
        status: "failure",
        message: "unable to fetch posts detail",
        error: err,
        data: [],
      })
  });
})

 router.delete("/:id",(req,res)=>{
  var tid=req.params.id
  posts.deleteOne({id:tid}).exec().then(
    (doc)=>{
  
      comment.deleteMany({parent:tid}).exec().then((doc)=>{
    console.log(doc)
    res.status(200).json({
      status:"success",
      message:"deleted successfully",
      data:doc
    });}).catch((err)=>{
      res.status(500).json({
        message:"err in comment"
      })
    })
   }).catch((err)=>{
    res.status(500).json({
      status:"failure",
      message:"not deleted",
      error:err
    })
  })
 })
  module.exports=router;