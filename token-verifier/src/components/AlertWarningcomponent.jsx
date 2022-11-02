import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";


const initialState = {
    message:''

}
class AlertWarning extends React.Component{
    constructor(){
        super();
        this.state = initialState;
    }

    createMessage(input){
        this.setState({message:input});
    }
    
    render(){
    return (
        <div className="alert-box">
 
      <FaExclamationTriangle />
      
    <div className="alert-content">
     Remember to remove quotation marks from private key after copying it!
    </div>

    
    </div>

     );
    }
   
}

export default AlertWarning;