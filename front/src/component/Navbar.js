import React,{useState} from "react";
import Link from "react-router-dom"
import "./Navbar.css"
function Navbar() {
    return ( <div>
        <ul className="navi1">
            <li><h1 className="head">Forum</h1></li>
            <li className="navi"><a href="/">Hot Topics</a></li>
            <li className="navi"><a href="/mydis">My Topics</a></li>
        </ul>
    </div> );
}

export default Navbar;