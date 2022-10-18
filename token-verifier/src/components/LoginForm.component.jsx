import React from 'react';
import { FaEnvelope,FaEye } from "react-icons/fa";


class LoginForm extends React.Component{

    render(){
	return (
		<div className='login'>
            <h1>Hello, welcome to the login page</h1>
            <div class="input-box">
            <FaEnvelope/>
            <input type="email" spellcheck="false" placeholder="Email ID" id="email-field"></input>
            <div id="email-error">
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