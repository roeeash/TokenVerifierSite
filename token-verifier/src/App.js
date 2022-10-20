import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm.component';
import { JSEncrypt } from "jsencrypt";
import {Amplify,  API } from 'aws-amplify';
import awsconfig from "./aws-exports";

const myAPI = "api631f24e8";
const path = '/customers'; 

Amplify.configure(awsconfig);


//inital state of the app
const initialState = {
  isSignedIn: false,
  isValidated: false,
  publicKey:'',
  privateKey :'',
  customerId:'',
  customers :[]
}

// Start our encryptor.
const encrypt = new JSEncrypt();


class App extends React.Component{
    //constructor, initallizg to inital state
    constructor(){
      super();
      this.state = initialState;
    }

    generateKeys = () =>{
      // Generate a RSA key pair using the `JSEncrypt` library.
      var crypt = new JSEncrypt({default_key_size: 2048});
      var PublicPrivateKey = {
          PublicKey: crypt.getPublicKey(),
          PrivateKey:crypt.getPrivateKey()
      };

      // PUBLIC  AND PRIVATE KEY
      this.setState({
        publicKey: PublicPrivateKey.PublicKey,
        privateKey:PublicPrivateKey.PrivateKey
      });

    }

    createEncryption = () =>{
    // Assign our encryptor to utilize the public key.
    encrypt.setPublicKey(this.state.publicKey);

    // Perform our encryption based on our public key - only private key can read it!
    var text = document.getElementById("myInput").value;
    var encrypted = encrypt.encrypt(text);
    document.getElementById("myOutput").value = encrypted;
  }

    createDecryption = () =>{
    // Decrypt with the private key...
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(this.state.privateKey);
    var text = document.getElementById("myOutput").value;
    var decrypted = decrypt.decrypt(text);
    document.getElementById("myInput").value = decrypted;
  }

  validateIdentity = () =>{
    //get user private key
    var userPrivateKey = document.getElementById("userKey").value;
    
    // Decrypt with the private key...
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(this.state.privateKey);
    //Decrypt with the user private key
    var userDecrypt = new JSEncrypt();
    userDecrypt.setPrivateKey(userPrivateKey);

    var text = encrypt.encrypt("hello");
    var decrypted = decrypt.decrypt(text);
    var userDcrypted = userDecrypt.decrypt(text);
    //if it is the user
    if(decrypted !== userDcrypted){
      document.getElementById("userOutput").innerHTML = "Hacker Detected!";
    }
    else{
      this.setState({isValidated:true});
    }
  } 


  getCustomer = () => {
    API.get(myAPI, path + "/" + this.state.customerId)
       .then(response => {
         console.log(response);
         this.setState(prevState => ({
          customers: [...prevState.customers, response]
      }));
      });
  }

  deleteCustomer = (customer) => {
    const temp = this.state.customers.filter(item => 
      item !== customer);
    this.setState({customers:temp});
  }



  render (){
        return(
        <div className= "main">
            <h1 className = "gradient-text">Token Verifier</h1>

          {
            this.state.isSignedIn ? 


          <div>
          <div>
      
        
          
          <div>
          <h1>Key generation : </h1>
          <button  className="btn" onClick={this.generateKeys}> Generate keys! </button>
          <h2>Public key is: <div> {this.state.publicKey}</div></h2>
          <h2>Private key is: <div> {this.state.privateKey}</div></h2>
          </div>

        </div>
       

          {
            this.state.isValidated
              
            ?
            
            
            <div className="form-box">
            <div>
            <h1>Encrypt/Decrypt text</h1>
            <h2>Ciphertext</h2>
            <div className="input-box">
            <input type="text" id ="myOutput" placeholder="encrypted"></input>
            <button  className="btn" onClick={this.createDecryption}>
            create Decryption
            </button>
          </div>
          
          <h2>Plaintext</h2>
          <div className="input-box">
          <input type="text" id ="myInput" placeholder="password"></input>
          <button className="btn" onClick={this.createEncryption}>
          create Encryption
          </button>
        </div>

        <div>
          <button className="btn" onClick={() =>window.open( 'http://www.google.com') }>
            Go to site!
          </button>
        </div>
        <br/>

        <div>
            <input type="text" id="customer-id" placeholder="customer id"
             onChange={e => this.setState({customerId:e.target.value})}></input>

            <button className="btn" onClick={this.getCustomer}>
            Get Customer!
          </button>
        
          </div>

          <div className="customer-list" >
          {
            this.state.customers.map(customer => {
              return <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>{customer.customerName}</div>
                <button onClick={() => this.deleteCustomer(customer)}> Delete</button>
              </div>
            })
          }
          </div>
          

        </div>
        </div>
      

        :
        <div  className="form-box">
        <div className="input-box">
        <input type="text" id ="userKey" placeholder="enter your private key"></input>
        </div>
        <div>
        <button className="btn" onClick={this.validateIdentity}>
        validate user identity
        </button>
       </div>

        <div id ="userOutput"></div>
      </div>

        }



        </div>




      
      :

        
        <div  className="form-box">
        <div>
        <LoginForm/>
        <button onClick={()=>{this.setState({isSignedIn:true})}}>
          Login!
        </button>
        </div>
        </div>
        }


        </div>
        );
    }
}

export default App;