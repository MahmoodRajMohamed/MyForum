import React,{useEffect, useState} from "react";
import axios from "axios"
import "./New.css"

function New(props) {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    // useEffect((e)=>{
    //     setTitle(e.target.value)
    //     },[title])
    // useEffect((e)=>{
    //     setDesc(e.target.value)
    // },[desc])
    var post1=()=>
    {
        console.log("in")
      var  data={
            "title":title,
            "desc":desc,
            "by":sessionStorage.getItem("user")
        }
        axios.post("http://localhost:9000/post",data).then((res)=>{
            console.log(res)
            props.show(true)
            window.location.reload()
        })
    }
    return (<div className="form-style-6">
        <span>Title</span><br></br>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input><br></br>
        <span>Description</span><br></br>
        <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
        <button onClick={post1}>Create</button><button onClick={()=>{props.show(true)}} >Cancel</button>
    </div>  );
}

export default New;     