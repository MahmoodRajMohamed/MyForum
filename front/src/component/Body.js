import axios from "axios";
import React,{useState,useEffect,} from "react";
import { useParams } from "react-router";
import New from './New'
import "./Body.css"
import Logo from "../component/delete.png";

function Body() {
    const [data,setData]=useState([{
        title:"Samsung Phone S22 ultra",
        desc:"About the newly released samsung phone",
        score:55,
        id:1
    },{
        topic:"jjj",
        id:2
    }])
    const id=useParams()

    useEffect(()=>{
        axios.get("http://localhost:9000/post").then((res)=>{
            console.log(res.data.data)
            setData(res.data.data)
        })
    },[])  
    var dele=(tid)=>{
        console.log(tid)
        axios.delete("http://localhost:9000/post/"+tid).then((res)=>{
            if(res.data.status=="success")
            {
                window.location.reload()
            }
            else{
                alert("not deleted")
            }
        }).catch((err)=>{console.log(err)})

    }
    const[show,setShow]=useState(true)
    const list=data.map(t=><div style={{marginLeft:'50px',marginTop:'50px',backgroundColor:'#c1c1c1',borderRadius:'20px',marginRight:'50px',height:'120px'}}><li style={{marginLeft:'20px'}} id={t.id}><a  href={'/forum/'+t.id} ><br></br><span style={{color:'black',fontSize:'23px'}}>{t.title}</span><br></br><br></br><span style={{color:'grey',fontSize:'16px',marginLeft:'20px'}}>{t.desc}</span> <span style={{color:'black', fontSize:'13px',float:'right',marginTop:'10px',marginRight:'20px'}}>{t.score}  Comments</span> </a>{t.by==sessionStorage.getItem("user") && <button id={t.id} style={{backgroundColor:'#c1c1c1',border:'none',float:'right',marginTop:'-40px',marginRight:'-50px'}} onClick={(e)=>{console.log(t.id);dele(t.id)}}><img style={{height:'30px', width:'30px'}} src={Logo}/></button>}</li></div>)
    return (  <div>
        <ul>
        
            {list}

        </ul>
       {sessionStorage.getItem("user") ? show?<button onClick={()=>{setShow(false)}} className="create">+ Create</button>:<New show={setShow}></New>:null}
    </div>);
}

export default Body;