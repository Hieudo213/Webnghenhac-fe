import {React, useState} from 'react'
import "./Registerr.css"
import { registerUser } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function Register() {
    const[firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleFirstname = (e)=>{
       setFirstname(e.target.value)
  }
  
  const handleLastname = (e)=>{
    setLastname(e.target.value);
  } 

  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }
  
  const handleUsername = (e) =>{
    setUsername(e.target.value);
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handleRegister = (e) =>{
    e.preventDefault();
    const newUser  = {
       firstname : firstname,
       lastname : lastname, 
      username : username,
      email : email,
      password : password
    };
    registerUser(newUser,dispatch,navigate);
  }
  return (
    <div id='loginn-container'>

            <div className="registerr-form">
                <form className='form' onSubmit={handleRegister}>
                    <div className='form-title'>
                       Sign up
                    </div>
                    <div className='form-username' >
                    <input className='email-input-text' type="text" placeholder="Firstname" onChange={handleFirstname} />
                    </div>
                    <div className='form-password'>
                    <input className='password-input-text' type="text" placeholder="Lastname" onChange={handleLastname} />
                    </div>
                    <div className='form-password'>
                    <input className='password-input-text' type="text" placeholder="Username" onChange={handleUsername} />
                    </div>
                    <div className='form-password'>
                    <input className='password-input-text' type="text" placeholder="Email" onChange={handleEmail}  />
                    </div>
                    <div className='form-password'>
                    <input className='password-input-text' type="password" placeholder="Password" onChange={handlePassword}  />
                    </div>
                    <div className='form-button'>
                        <button className='loginn-button'>Sign up</button>
                    </div>
                </form>
            </div>

        </div>
  )
}

export default Register