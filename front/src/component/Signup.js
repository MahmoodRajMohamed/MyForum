import React,{ Component} from 'react'
// import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './index.css'

class Login extends Component{
    
    constructor(){
        super()
        this.repassword="this"
        this.state ={
            email:'',
            password:'',
            user:''
        }
        this.changeemail=this.changeemail.bind(this)
        this.changepassword=this.changepassword.bind(this)
        this.changerepassword=this.changerepassword.bind(this)
        this.changeuser=this.changeuser.bind(this)
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
    changerepassword(event)
    {
        this.repassword=event.target.value
    }
    changeuser(event){
        console.log(this.state.user)
        this.setState({
            user:event.target.value
        })
    }
   
    onSubmit(event){
        event.preventDefault()
        console.log(this.state.user)
        if(this.state.password==this.repassword)
        {
          
        const user ={
            email:this.state.email,
            password:this.state.password,
            user:this.state.user
        }

        axios.post('http://localhost:9000/user/signup',user)
        .then((response) =>{console.log(response.data[0].status)
        if(response.data[0].status=="success")
        {
         alert("User Created")
         window.location.href="/login"
        }
        else{
            alert("not created")
        }
        } )
      
        /*to clear the entered data */
        this.setState({
            email:'',
            password:''
        })
    }
    else{
        window.alert("Password mismatch")
    }
    }
    render(){
       
        return(
            <div>
                <body>
                               
                <div className='container'>
                
                    <div className='card'>
                        <form onSubmit={this.onSubmit}>
                                <div className="label"><p> REGISTER </p>
                                </div>
                            
                            <div className='box'>
                           


                            <input type='text'
                            placeholder='enter email'
                            onChange={this.changeemail}
                            value={this.state.email}
                            className='form-control form-group'style={{height:"40px",width:"50%",marginLeft:"160px"}}
                            /><br></br><br></br>

                            <input type='text'
                            placeholder='Enter User'
                            onChange={this.changeuser}
                            className='form-control form-group' style={{height:"40px",width:"50%", marginLeft:"160px"}}
                            value={this.state.user} /><br></br><br></br>


                            <input type='password'
                            placeholder='enter password'
                            onChange={this.changepassword}
                            value={this.state.password}
                            className='form-control form-group' style={{height:"40px",width:"50%", marginLeft:"160px"}}
                            
                            /><br></br><br></br>
                            </div>
                            <input type='password'
                            placeholder='re enter password'
                            onChange={this.changerepassword}
                            className='form-control form-group' style={{height:"40px",width:"50%", marginLeft:"160px"}}/><br/><br></br>
                            <input type='button' className='btn btn-success' value='Register' onClick={this.onSubmit}/>
                            <div className="label2">
                            <a className='lnk' href="/" > <p >Already have account ? Login</p></a>
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