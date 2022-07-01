const comment =require( "../model/comment");
const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')
const post=require('../model/story')
router.post("/",(req,res)=>{
    const cid=req.body.cid
    const parent=req.body.parent
    var maxid
console.log("in nest")
    comment.findOne().sort({id:-1}).exec().then((data)=>{
      console.log("hiii")
      console.log(data)
   if(data)
   {
    console.log("in if")
    maxid=data.id;
   }
   else{
    console.log("in else")
    maxid=0
   }
   console.log(req.body.parent)
    const newComment= new comment({
      _id: new mongoose.Types.ObjectId(),
      by: req.body.user,
      text:req.body.text,
      parent:req.body.parent,
      time:Date.now(),
      id:maxid+1
    });
   console.log("in")
    newComment
      .save()
      .then((result) => {
        post.updateOne({id:req.body.parent},{$inc:{score:1}}).exec().then(doc=>console.log("GOT",doc)).catch(err=>console.log(err))
        comment.updateOne({id:req.body.cid},{$push:{kids:maxid+1}}).exec().then(doc=>console.log("comment updated",doc)).catch(err=>console.log(err))
        console.log("Result: ", result);
        res.status(201).json([
          {
            status: "success",
            message: "Comment Added",
            data: newComment,
          },
        ]);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status=500
        res.json([
          {
            status: "failure",
            message: "unable to add Comment",
            error: err,
            data: [],
          },
        ]);
      })});
     
  });

  router.get("/", (req,res,err) => {
    const data=JSON.parse(req.query.data)
    console.log(data.kids)
    comment.find({id:{$in:data.kids}})
      .exec()
      .then((docs) => {
        console.log("comments"+docs);
        if (docs.length > 0) {
          res.status(200).json({
            status: "success",
            message: "Comment Details",
            count: docs.length,
            data:docs,
            
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "Comment not found",
            count: 0,
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json(
          {
            status: "failure",
            message: "unable to fetch comment detail",
            error: err,
            data: [],
          },
        );
      });
  });
router.get("/:id",(req,res)=>{
  var pid=req.params['id']
  post.find({id:pid}).then((doc)=>{
    res.status(200).json({
      docs:doc
    })
  })
})
  router.delete("/:id",(req,res)=>{
    var pid=req.params['id'];
    comment.deleteOne({id:pid}).then((doc)=>{
      if(doc.lenght>0)
      {
        res.status(200).json({
          status:"success",
          message:"Deleted Success",        
        })
      }
    })
})

module.exports=router