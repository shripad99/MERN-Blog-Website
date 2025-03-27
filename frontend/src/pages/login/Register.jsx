import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  
  const toggleShowPassword = () =>{
      setIsShowPassword(!isShowPassword);
  }

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError(""); // Clear previous error

    try {
      const res = await axios.post("https://mern-blog-website-l5zm.onrender.com/auth/register", {
        username,
        email,
        password,
      });

      if (res.data) {
        toast("🚀 Account created successfully!");
        setTimeout(() => {
          window.location.replace("/"); // Redirect to login page on successful registration
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(./assets/images/nature.webp)] bg-cover bg-center bg-no-repeat">
      <div className="w-96 rounded bg-white px-7 py-10 drop-shadow-lg">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>
          <input
            type="text"
            placeholder="Username"
            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-4'>
            <input type={isShowPassword ? "text": "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='w-full text-sm  bg-transparent py-3 mr-3 rounded outline-none' value={password} required/>
            {isShowPassword ? <FaRegEye size={22} className='cursor-pointer text-gray-500' onClick={() => toggleShowPassword()}/> : <FaRegEyeSlash  size={22} className='text-slate-400 cursor-pointer' onClick={() => toggleShowPassword()}/>}
          </div>
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button
            type="submit"
            className="w-full text-sm text-white p-2 rounded my-1 bg-blue-500"
          >
            Create Account
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
