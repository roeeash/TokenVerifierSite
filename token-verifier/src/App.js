import React from 'react';
import LoginForm from './components/LoginForm.component';
import AlertWarning from './components/AlertWarningcomponent';
import './styles/App.css';
import {FaLock} from "react-icons/fa";
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
  hasGeneratedKeys : false,
  publicKey:'',
  privateKey :'',
  customerId:'',
  fileDownloadUrl:'',
  identityValidationInput: '',
  customers :[],
  data: ''
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

      // PUBLIC  AND PRIVATE KEY SET, ALSO ADD HAS GENE
      this.setState({
        publicKey: PublicPrivateKey.PublicKey,
        privateKey:PublicPrivateKey.PrivateKey,
        hasGeneratedKeys: true,
        data: PublicPrivateKey.PrivateKey
      }, () => {
        this.downloadCode();
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
    var userPrivateKey = this.state.identityValidationInput;
    
    // Assign our encryptor to utilize the public key.
    encrypt.setPublicKey(this.state.publicKey);

  
    //Decrypt with the user private key
    var userDecrypt = new JSEncrypt();
    userDecrypt.setPrivateKey(userPrivateKey);

    var text = encrypt.encrypt("hello");
    var userDecrypted = userDecrypt.decrypt(text);


    //if it is the user
    if(userDecrypted !== "hello" || !this.state.hasGeneratedKeys){
      document.getElementById("userOutput").innerHTML = "Permission Denied";
    }
    else{
      this.setState({isValidated:true});
    }
  } 
  //download file with code
  downloadCode = () => {
      //set state to data
      //get data to output
      const fileData = JSON.stringify(
        this.state.data.replace(/[\r\n]/gm, '').substring(31,1625).split('-')[0]
        );
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      //download it
      link.download = "user-info.txt";
      link.href = url;
      link.click();
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
            <div className = "gradient-text">
            <h1>Token Verifier</h1>
            </div>

          {
            this.state.isSignedIn ? 


          <div>
          <div>
      
        
          
          <div>
          <h1>Key generation : </h1>
          <div className='form-box'>
          <button  className="btn" onClick={this.generateKeys}> Generate keys </button>
          <h3>Public key is: <div> {this.state.publicKey}</div></h3>
          </div>
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
            Create Decryption
            </button>
          </div>
          
          <h2>Plaintext</h2>
          <div className="input-box">
          <input type="text" id ="myInput" placeholder="password"></input>
          <button className="btn" onClick={this.createEncryption}>
          Create Encryption
          </button>
        </div>

        <div>
          <button className="btn" onClick={() =>window.open( 'https://aws.amazon.com/') }>
            Go to site
          </button>
        </div>
        <br/>

        <div>
            <input type="text" id="customer-id" placeholder="customer id"  maxLength="10"
             onChange={e => this.setState({customerId:e.target.value})}></input>

            <button className="btn" onClick={this.getCustomer}>
            Get Customer
          </button>
         
          </div>

          <br/>

          <div className="customer-list" >
          {
            this.state.customers.map(customer => {
              return <div style={{display:'flex',
              justifyContent:'space-between'}}>
                
                <div>{customer.customerName}</div>
                <button className ="btn" onClick={() => this.deleteCustomer(customer)}> Delete</button>
              </div>
            })
          }
          </div>
          

        </div>
        </div>
      

        :
        <div  className="form-box">
        <h1> Validate your identity</h1>
        <div className="alert-content">
        <AlertWarning  />
        </div>
        <div className="input-box">
        <FaLock/>
        <input type="text" id ="userKey" placeholder="enter your private key"
         onChange={e => this.setState({identityValidationInput:e.target.value})}></input>
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
        <button className='btn' onClick={()=>{this.setState({isSignedIn:true})}}>
          Login
        </button>
        </div>
        </div>
        }


        </div>
        );
    }
}

export default App;