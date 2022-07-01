import axios from "axios";
import React, { useEffect, useState } from "react";
import "./myforum.css"
import Logo from "../component/delete.png";
function MyForum() {
    const id=sessionStorage.getItem("user")
    const [data,setData]=useState([{
        title:"Samsung Phone S22 ultra",
        desc:"About the newly released samsung phone",
        score:55,
        id:1,
        by:"hh"
    }])
    useEffect(()=>{
        axios.get("http://localhost:9000/post/"+id).then((res)=>{
            console.log(res.data)
            setData(res.data.data)
        })
    },[])
    var dele=(tid)=>{
        console.log(tid)
        axios.delete("http://localhost:9000/post/"+tid).then((res)=>{
console.log(res)
window.location.reload()
        }).catch((err)=>{console.log(err)})

    }
    const list=data.map(t=><div style={{marginLeft:'50px',marginTop:'50px',backgroundColor:'#c1c1c1',borderRadius:'20px',marginRight:'50px',height:'120px'}}><li style={{marginLeft:'20px'}}id={t.id}><a  href={'/forum/'+t.id}><br></br><span style={{color:'black',fontSize:'23px'}}>{t.title}</span><br></br> <br></br><span style={{color:'grey',fontSize:'16px',marginLeft:'20px'}}>{t.desc}</span><span style={{color:'black', fontSize:'13px',float:'right',marginTop:'10px',marginRight:'20px'}}> {t.score} Comments</span></a> 
    {sessionStorage.getItem("user")== t.by && <button id={t.id} style={{backgroundColor:'#c1c1c1',border:'none',float:'right',marginTop:'-40px',marginRight:'-50px'}} onClick={(e)=>{dele(t.id)}}><img style={{height:'30px', width:'30px'}} src={Logo}/></button>}</li></div>)
    return (  <div>
        
        {sessionStorage.getItem("user")?list:null}
        
    </div>);
}

export default MyForum;