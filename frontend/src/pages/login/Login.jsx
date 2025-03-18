import React, { useRef, useContext } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import { Context } from '../../context/Context';

const Login = () => {
    const userRef = useRef();
    const passRef = useRef();
    const { dispatch, FetchData } = useContext(Context);

    const handleLogin = async (e) =>{
      e.preventDefault()
      dispatch({ type: 'LOGINSTART' })
      try {
        const res = await axios.post('https://mern-blog-website-l5zm.onrender.com/auth/login', {
          username: userRef.current.value,
          password: passRef.current.value,
        })
        dispatch({ type: 'LOGINSUCC', payload: res.data})
      }catch(err){
        dispatch({ type: 'LOGINFAILED' })
      }
      window.location.replace("/")
    }
    console.log(FetchData);
  return (
    <div className='flex items-center justify-center min-h-screen bg-[url(./assets/images/nature.webp)] bg-cover bg-center bg-no-repeat'>
        <div className='w-96 rounded bg-white px-7 py-10 drop-shadow-lg'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type='text' placeholder='Username' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' ref = {userRef} />
            <input type='password' placeholder='Password' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' ref = {passRef} />
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
      </div>
  )
}

export default Login
