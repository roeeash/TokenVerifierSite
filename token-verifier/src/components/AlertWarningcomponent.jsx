import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import "../App.css";

class AlertWarning extends React.Component{

    render(){
    return (
    <div className="alert-warning-border">
      <FaExclamationTriangle />
      
    </div>
     );
    }
   
}

export default AlertWarning;