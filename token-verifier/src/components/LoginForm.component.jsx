import React from 'react';
import { FaEnvelope,FaEye } from "react-icons/fa";

//initial state of the login form
const initialState = {
    email:'',
    isValidEmail: false
}



class LoginForm extends React.Component{

    constructor(){
        super();
        this.state = initialState;
    }

    render(){
	return (
		<div className='login'>
            <h1>Hello, welcome to the login page</h1>
            <div class="input-box">
            <FaEnvelope/>
            <input type="email" spellcheck="false" 
            placeholder="Email ID" id="email-field"
            onChange={e => 
            {
                if(/\S+@\S+\.\S+/.test(e.target.value)){
                    this.setState({isValidEmail:true, email:e.target.value});
                }
                else{
                    this.setState({isValidEmail:false, email:e.target.value});
                }

            }
            }></input>
            <div id="email-error">
                {
                    !this.state.isValidEmail && 
                    <span style={{display: (this.state.email !== "") ? 'block' : 'none',
                    color:"red"}}>Email is invalid!</span>
                }
         </div>
        </div>

        <div class="input-box">
            <FaEye/>
            <input type="password" placeholder="Password" id="myInput"></input>
        </div>
			
		</div>
	);
    }
}

export default LoginForm;