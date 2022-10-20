import React from 'react';
import { FaEnvelope,FaEye } from "react-icons/fa";

//initial state of the login form
const initialState = {
    email:'',
    message: '',
    error:false
}



class LoginForm extends React.Component{

    constructor(){
        super();
        this.state = initialState;
    }
    isValidEmail = () => {
        return /\S+@\S+\.\S+/.test(this.email);
    }

    render(){
	return (
		<div className='login'>
            <h1>Hello, welcome to the login page</h1>
            <div class="input-box">
            <FaEnvelope/>
            <input type="email" spellcheck="false" 
            placeholder="Email ID" id="email-field"
            onChange={e => this.setState({email:e.target.value})}></input>
            <div id="email-error">
            <input
            id="message"
            name="message"
            value={this.state.message}
            />

            {this.state.error && <h2 style={{color: 'red'}}>{this.state.error}</h2>}
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