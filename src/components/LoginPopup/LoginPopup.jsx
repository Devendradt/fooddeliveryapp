import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

// const LoginPopup = ({setShowLogin}) => {

//     const [currState,setCurrState] = useState("Sign Up");

//   return (
//     <div className='login-popup'>
//         <div className="login-popup-container">
//             <div className="login-popup-title">
//                 <h2>{currState}</h2> <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//             </div>
//             <div className="login-popup-inputs">
//                 {currState==="Sign Up"?<input type="text" placeholder='Your name' />:<></>}
//                 <input type="email" placeholder='Your email' />
//                 <input type="password" placeholder='Password' />
//             </div>
//             <button>{currState==="Login"?"Login":"Create account"}</button>
//             <div className="login-popup-condition">
//                 <input type="checkbox" name="" id="" />
//                 <p>By continuing, i agree to the terms of use & privacy policy.</p>
//             </div>
//             {currState==="Login"
//                 ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
//                 :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
//             }
//         </div>
//     </div>
//   )
// }

// export default LoginPopup



//import React, {useState} from "react"
import axios from "axios"
//import '../css/LoginSignup.css'
import { useNavigate} from "react-router-dom"


function LoginPopup() {

  const [state,setState] = useState("SignUp");

  const history=useNavigate();

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/signup",{
                name,email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                    history("/",{state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    async function login(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:8000/signup",{
              email,password
          })
          .then(res=>{
              if(res.data==="exist"){
                  alert("Login Successfully")
                  history("/",{state:{id:email}})
              }
              else if(res.data==="notexist"){
                alert("You have not SignUp")
                  history("/signup")
              }
          })
          .catch(e=>{
              alert("wrong details")
              console.log(e);
          })

      }
      catch(e){
          console.log(e);

      }

  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="SignUp" ? <input type='text' onChange={(e) => {setName(e.target.value)}} placeholder='Your Name' ></input> :<></>}
          <input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Your Email' ></input>
          <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Your Password'></input>
        </div>
        {state==="SignUp" ? <button onClick={submit}>SignUp</button> : <button onClick={login}>Login</button>}

        {state==="SignUp" 
        ? <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}> Login Here</span></p>
        : <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("SignUp")}}> Click Here</span></p>}

        <div className='loginsignup-agree'>
          {state==="SignUp" ? <input type='checkbox' name='' id=''></input> : <></>}
          {state==="SignUp" ? <p>By Clicking, I agree to the terms of use & privacy policy</p> : <></>}
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
