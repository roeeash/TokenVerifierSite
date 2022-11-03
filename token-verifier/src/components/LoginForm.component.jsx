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
            <h1>Login Page</h1>
            <h2>Please enter your email and password</h2>
            <div className="input-box">
            <FaEnvelope/>
            <input type="email" spellCheck="false" 
            placeholder="Email ID" id="email-field"
            onChange={e => 
            {
                if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/.test(e.target.value)){
                    this.setState({isValidEmail:true, email:e.target.value});
                }
                else{
                    this.setState({isValidEmail:false, email:e.target.value});
                }

            }
            }></input>
            </div>
            <div className="alert" id="email-error">
                {
                    !this.state.isValidEmail && 
                    <span style={{display: (this.state.email !== "") ? 'block' : 'none'}}>Email is invalid!</span>
                }
         </div>

        

        <div className="input-box">
            <FaEye onClick={this.changePasswordType.bind(this)}/>
            <input type={this.state.isPasswordShown ? "text" : "password"}  placeholder="Password"></input>
        </div>
			
		</div>
	);
    }
}

export default LoginForm;