import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UsersContext';


export default function Login() {
const nav = useNavigate()
const {validateUser} =useUsers()

function onLoginSubmit(e) {
    e.preventDefault();

    const LoginData = Object.fromEntries(new FormData(e.target).entries());
    if(validateUser(LoginData)){
        nav("/team")
        return
    }
    alert("user is not exist")
    

    }

  return (
       <div className="flex items-center justify-center min-h-screen w-full">
        <form onSubmit={onLoginSubmit} ><div className="mb-4">
          <input
              name="userName"type="text"placeholder="Username"className="w-full p-3 border-[1px] border-[lightgray] "
            />
          </div>
          <div className="mb-6">
          <input
              name="password"type="password"placeholder="Password" className="w-full p-3 border-[1px] border-[lightgray] "
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className=' bg-yellow-300 p-2' >
              Login
            </button>
            <button
              onClick={() => nav("/register")}type="button"className='bg-blue-500 p-2'
            >
              Register
            </button>
          </div>
        </form>
      </div>
  )
}