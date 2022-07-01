import axios from "axios";
import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import Logo from "../component/delete.png";
import "./Forum.css"
function Forum() {
    var da
    const id=useParams()
    const [ign,setIgn]=useState("");
    const [comments,setComments]=useState("tt");
    const [rly,setRly]=useState(false)
    const [name,setName]=useState("")
    const [cid,setCid]=useState(0)
    const [title,setTitle]=useState("Forum")
    const[data,setData] =useState([
        {
            "title":"Samsung A50",
        
            "by": 'Mahmood',
            "kids": [],
            "parent": 4,
            "text": 'f you only want to style a specific input type, you can use attribute selectors: input [type=text] - will only select text fields input [type=password] - will only select password fields input [type=number] - will only select',
            "id": 1,
            __v: 0
          }
    ])
    
     useEffect(()=>{
         console.log(id.id,"printing")
    
         axios.get("https://raj-forum.herokuapp.com/comment/"+parseInt(id.id)).then(res=>{
        setData(res.data.data);  
     })
     axios.get("https://raj-forum.herokuapp.com/nest/"+parseInt(id.id)).then((res)=>{
        console.log(res.data.docs[0].title)
            setTitle(res.data.docs[0].title)
     })
     },[])
     var dele=(tid)=>{
        console.log(tid)
        axios.delete("https://raj-forum.herokuapp.com/comment/"+tid).then((res)=>{            
                window.location.reload()
        
        }).catch((err)=>{console.log(err)})

    }
     var post1=()=>
     {
        console.log(cid)
        if(cid!=0)
        {
            var comment={
                "user":sessionStorage.getItem('user'),
                "parent":parseInt(id.id),
                "text":comments,
                "cid":cid
            }
            axios.post("https://raj-forum.herokuapp.com/nest",comment).then(res=>{
                console.log(res.data)
            })
        }
        else{
            var comment={
                "user":sessionStorage.getItem('user'),
                "parent":parseInt(id.id),
                "text":comments,
             }
                 axios.post("https://raj-forum.herokuapp.com/comment",comment).then(res=>{
                     if(res.data[0].message=="Comment Added")
                     {
                        window.location.reload()
                     }
                 })
        }
    
        
     }

    // onClick={()=>{document.getElementById(t.id).innerHTML="kkkkk"}}
   const list =[]
   const list1=[]
   let i=0
      data.map(t=>{list.push(<div style={{marginTop:'50px',marginRight:'300px',marginLeft:'400px',fontSize:'23px',flex:'wrap'}}><span style={{}}>{t.by}</span><br></br><br></br>
      <div style={{}}>
      <span style={{width:'50px',height:'100px',fontSize:'18px',color:'grey'}}>{t.text}</span><br></br><br></br>
      <button style={{width:'60px',height:'40px',borderRadius:'8px',border:'none'}} onClick={(e)=>{setRly(true);setName(e.target.id);console.log(e.target.value);setCid(e.target.id)}} id={t.id} value={t.id}>reply</button>
      {t.by==sessionStorage.getItem("user") && <button id={t.id} style={{backgroundColor:'#c1c1c1',border:'none',float:'right',marginTop:'-40px',marginRight:'-50px'}} onClick={(e)=>{console.log(t.id);dele(t.id)}}><img style={{height:'30px', width:'30px'}} src={Logo}/></button>}
      </div>
       {ign}</div>)
        
        if(t.kids.length!==0)
        {
            let data1={
                kids:t.kids
            }
            // console.log(data1)
            
            axios.get("https://raj-forum.herokuapp.com/nest?data="+JSON.stringify(data1)).then((doc)=>{
        
                doc.data.data.map(t1=>{
                    console.log(t1.text)
                    list.push(<div>{t1.kids}</div>)
                    
                })
            })
        }
    
    })
// var list=[]
// data.map(t=>{list.push(<li>{t.by}</li>)})
// console.log(list)
    return (
         <div>
            <body>
            
           {/* { data.map(t=>{<div><span>{t.by}</span><br/>{t.text}<br/>
        <span onClick={(e)=>{setRly(true);setName(e.target.id);
        console.log(e.target.value);
        setCid(e.target.id)}} id={t.id} value={t.id}>reply</span> {ign}</div>
        
        if(t.kids.length!==0)
        {
            let data1={
                kids:t.kids
            }
            console.log(data1)
            
            axios.get("http://localhost:9000/nest?data="+JSON.stringify(data1)).then((doc)=>{
        
                doc.data.data.map(t1=>{
                    <div>{t1.text}</div>
                    
                })})
        }
    })}  */}
    <div className="title"><h1>{title}</h1></div>
    <div style={{marginTop:'10px',marginLeft:'470px'}}>
       {sessionStorage.getItem("user") ? <div ><input style={{marginLeft:"60px",borderRadius:"4px",width:"500px",height:"40px",display:'inline-block',paddingLeft:'10px',border:"0px"}} type="text" onChange={(e)=>{setComments(e.target.value)}}></input>
        <button style={{marginLeft:"10px",borderRadius:"3px",border:'none',width:"80px",height:"40px"}} onClick={post1}>Post</button></div>:null}
       </div>

    <div style={{}} className="chat">{list}</div>

    <div className="con">
        {rly?<div style={{marginTop:"0%"}}><span>reply to : {name}</span> <span className="cancel" onClick={()=>{setRly(false)}} >x</span></div>:null}      
        
       </div>

        </body></div>
     ); 
}

export default Forum;