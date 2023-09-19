import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  async function registerUser(e) {
    e.preventDefault()
    try {
      const userDoc= await axios.post("/register", {
        name,
        email,
        password
      })
      console.log(userDoc)
      if(userDoc){
        console.log('Registration successful')
        navigate("/login")
      }
    } catch (e) {
      alert("Registration Failed")
    }
  }


  return (
    <div className=' m-4 grow flex items-center justify-around'>
      <div className='w-1/2 sm:w-2/3 mb-32'>
        <h2 className='text-4xl text-center m-2'>Register</h2>
        <form onSubmit={registerUser} className=' w-4/5 p-2 mx-auto border border-stone-400 shadow-lg shadow-stone-200 rounded-md'>
          <input type="text" placeholder='write your Name' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='write your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='write your****password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className=' w-full py-2 my-2 rounded-xl'>Register</button>
          <div className=' text-center pt-1'>Already a member?
            <Link to={"/login"} className=' underline text-stone-400'> Login here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register