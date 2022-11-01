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
            <div className="input-box">
            <FaEnvelope/>
            <input type="email" spellCheck="false" 
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