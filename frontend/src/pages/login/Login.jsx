import React, { useRef, useContext, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import { Context } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Login = () => {
    const userRef = useRef();
    const passRef = useRef();
    const { dispatch, FetchData } = useContext(Context);

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () =>{
        setIsShowPassword(!isShowPassword);
    }

    const handleLogin = async (e) =>{
      e.preventDefault()
      dispatch({ type: 'LOGINSTART' })
      try {
        const res = await axios.post('https://mern-blog-website-l5zm.onrender.com/auth/login', {
          username: userRef.current.value,
          password: passRef.current.value,
        })
        dispatch({ type: 'LOGINSUCC', payload: res.data})
        toast.success("Login Successfull");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }catch(err){
        dispatch({ type: 'LOGINFAILED' })
        toast.error("Login Failed")
      }
    }
    console.log(FetchData);
  return (
    <div className='flex items-center justify-center min-h-screen bg-[url(./assets/images/nature.webp)] bg-cover bg-center bg-no-repeat'>
        <div className='w-96 rounded bg-white px-7 py-10 drop-shadow-lg'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type='text' placeholder='Username' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' ref = {userRef} />
            <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-4'>
                <input type={isShowPassword ? "text": "password"} placeholder="Password" className='w-full text-sm  bg-transparent py-3 mr-3 rounded outline-none' ref={passRef}/>
                {isShowPassword ? <FaRegEye size={22} className='cursor-pointer text-gray-500' onClick={() => toggleShowPassword()}/> : <FaRegEyeSlash  size={22} className='text-slate-400 cursor-pointer' onClick={() => toggleShowPassword()}/>}
            </div>
            {/* {error && <p className='text-red-500 text-xs pb-1'>{error}</p>} */}
            <button type='submit' className='w-full text-sm text-white p-2 rounded my-1 bg-blue-500' disabled={FetchData}>
              Login
            </button>
            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to='/register' className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
  )
}

export default Login
