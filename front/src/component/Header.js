import React,{useState,useEffect} from "react";

import Loggin from "./Loggin";
import "./Header.css"
function Header() {
    const[login,setLogin]=useState(false);
    const [show,setShow]=useState(true)
    
    return ( 
        
    <div>
        
        {!sessionStorage.getItem("user")?<button className="login" onClick={()=>{setLogin(!login)}}>Login</button>:<span onClick={()=>{sessionStorage.clear();window.location.reload()}} style={{color:"white"}} className="login">{sessionStorage.getItem("user")}</span>}
        {login?<Loggin ></Loggin>:null}
    </div> );
}

export default Header;