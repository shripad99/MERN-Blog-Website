import React from "react"
import image from "../../assets/images/input.png"
import "./account.css"
import Navbar from "../../components/header/Navbar"
import Footer from "../../components/footer/Footer"

export const Account = () => {
  return (
    <>
      <Navbar />
      <section className='accountInfo'>
        <div className='container boxItems rounded-lg shadow-xl'>
          <h1 className="text-xl">Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input type='file' accept='image/*' src={image} alt='img' />
                <img src={image} alt='image' class='image-preview' />
              </div>
            </div>
            <div className='right'>
              <div className="pb-2">
              <label htmlFor=''>Username</label>
              <input type='text' className="border w-full py-2 rounded"/>
              </div>
              <div className="pb-2">
              <label htmlFor=''>Email</label>
              <input type='email' className="border w-full py-2 rounded"/>
              </div>
              <div className="pb-2">
              <label htmlFor=''>Password</label>
              <input type='password' className="border w-full py-2 rounded"/>
              </div>
              <div className="flex justify-between pt-3">
                <button className='button border px-5 py-2 rounded'>Update</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}