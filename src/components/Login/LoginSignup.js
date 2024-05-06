import React, {useState} from "react"
import axios from "axios"
import '../Login/LoginSignup.css'
import { useNavigate} from "react-router-dom"


function LoginSignup() {

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

export default LoginSignup