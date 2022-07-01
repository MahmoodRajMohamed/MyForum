import React,{ Component} from 'react'
//import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './index.css'

class Login extends Component{
    constructor(){
        super()
        this.state ={
            email:'',
            password:'',
            user:''
        }
        this.changeemail=this.changeemail.bind(this)
        this.changepassword=this.changepassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
  
    changeemail(event){
        this.setState({
        email:event.target.value
        })
    }
    changepassword(event){
        this.setState({
        password:event.target.value
        })
    }
   
   
    onSubmit(event){
        event.preventDefault()
        const user ={
            email:this.state.email,
            password:this.state.password
        }
        console.log("ONSUBMIT")
        axios.post('http://localhost:9000/user/login',user)
        .then((response) => {console.log(response.data[0].data[0].username)
        sessionStorage.setItem("user",response.data[0].data[0].username)
        alert("login successful")
        
        this.setState({
            email:'',
            password:''
        })
        window.location.href="/"})
    }
    render(){
       
        return(
            <div>
                <body>
                               
                <div className='container'>
                
                    <div className='card'>                       <form onSubmit={this.onSubmit}>
                                <div className="label"><p> LOGIN </p>
                                </div>
                            
                            <div className='box'>
                           


                            <input type='name'
                            placeholder='enter email'
                            onChange={this.changeemail}
                            value={this.state.email}
                            className='form-control form-group' style={{height:"40px",width:"50%",width:"70%",marginLeft:"110px",marginBottom:"25px"}}
                            /><br></br>
                           


                            <input type='password'
                            placeholder='enter password'
                            onChange={this.changepassword}
                            value={this.state.password}
                            className='form-control form-group' style={{height:"40px",width:"50%", width:"70%",marginLeft:"110px", marginBottom:"25px"}}
                            /><br></br>
                            </div>
                            <input type='submit' className='btn btn-success' value='LOGIN'/>
                            <div className="label2">
                               <a className='lnk' href="/signup" > <p >Create new account ? Signup</p></a>
                                </div>
                        </form>
                        
                    </div>
                </div>
                </body>
            </div>

        );
    }
}

export default Login;