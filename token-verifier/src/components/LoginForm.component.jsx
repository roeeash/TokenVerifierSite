import React from 'react';
import { FaEnvelope,FaEye } from "react-icons/fa";

//initial state of the login form
const initialState = {
    email:'',
    isPasswordShown:false,
    isValidEmail: false
}



class LoginForm extends React.Component{

    constructor(){
        super();
        this.state = initialState;
    }

    changePasswordType(){
    //change password type
    this.setState({isPasswordShown:(!this.state.isPasswordShown)});
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
            </div>
            <div className="w3-panel w3-red" id="email-error">
                {
                    !this.state.isValidEmail && 
                    <span style={{display: (this.state.email !== "") ? 'block' : 'none',
                    color:"red"}}>Email is invalid!</span>
                }
         </div>

        

        <div class="input-box">
            <FaEye onClick={this.changePasswordType.bind(this)}/>
            <input type={this.state.isPasswordShown ? "text" : "password"}  placeholder="Password"></input>
        </div>
			
		</div>
	);
    }
}

export default LoginForm;