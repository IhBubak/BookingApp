import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  async function loginUser(e) {
    e.preventDefault()
    try {
      const {data} = await axios.post("/login", {
        email,
        password
      })
      if (data) {
        setUser(data)
        navigate("/")
      }
    } catch (e) {
      alert("Login Failed")
    }
  }

  return (
    <div className=' m-4 grow flex items-center justify-around'>
      <div className='w-1/2 sm:w-2/3 mb-48'>
        <h2 className='text-4xl text-center m-2'>Login</h2>
        <form onSubmit={loginUser} className=' w-4/5 p-2 mx-auto border border-stone-400 shadow-lg shadow-stone-200 rounded-md'>
          <input type="email" placeholder='write your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='write your****password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className=' w-full py-2 my-2 rounded-xl'>Login</button>
          <div className=' text-center pt-1'>No Account Yet?
            <Link to={"/register"} className=' underline text-stone-400'> Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login