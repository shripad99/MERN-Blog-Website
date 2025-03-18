import React from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsBagCheck } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrHelp } from 'react-icons/gr'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const User = () => {
  const { user, dispatch } = React.useContext(Context);
  console.log(user);

  const [profileOpen, setProfileOpen] = React.useState(false)

  const close = () => {
    setProfileOpen(false);
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    window.location.replace('/')
  }
  return (
    <>
      <div className="relative ml-8 cursor-pointer">
        {
          user ? (
            <>
              <button className="w-10 h-10 rounded-full overflow-hidden" onClick={() => setProfileOpen(!profileOpen)}>
                <img src='https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?t=st=1742284977~exp=1742288577~hmac=feef38407015dd77285a6a3e62f1f0e2e2bdf0e96d3255f52025889081045079&w=1380' alt='profile' className="w-full h-full object-cover" />
              </button>
              {profileOpen && (
                <div className="absolute top-16 right-2 w-64 bg-white shadow-lg rounded-md p-4 text-black z-1" onClick={close}>
                  <Link to='/account' className="text-gray-700 hover:text-blue-500 transition capitalize">
                    <div className="flex items-center pb-4 border-b">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src='https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?t=st=1742284977~exp=1742288577~hmac=feef38407015dd77285a6a3e62f1f0e2e2bdf0e96d3255f52025889081045079&w=1380' alt='profile' className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{user.username}</h2>
                        <p className="text-sm">Mumbai ,India</p>
                      </div>
                    </div>
                  </Link>
                  <Link to='/create' className="block pt-2 text-gray-700 hover:text-blue-500 transition capitalize">
                    <button className='flex items-center w-full px-4 py-2 text-left'>
                      <RiImageAddLine className='text-lg mr-3' />
                      <span className="text-sm font-medium">Create Post</span>
                    </button>
                  </Link>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 transition capitalize">
                    <IoSettingsOutline className="text-lg mr-3" />
                    <span className="text-sm font-medium">My Account</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 transition capitalize">
                    <BsBagCheck className="text-lg mr-3" />
                    <span className="text-sm font-medium">My Orders</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 transition capitalize">
                    <AiOutlineHeart className="text-lg mr-3" />
                    <span className="text-sm font-medium">Wishlist</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 transition capitalize">
                    <GrHelp className="text-lg mr-3" />
                    <span className="text-sm font-medium">Help</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:text-blue-500 transition capitalize" onClick={handleLogout}>
                    <BiLogOut className="text-lg mr-3" />
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="text-sm font-medium border px-6 py-2 rounded shadow-md transition">
                Login
              </button>
            </Link>
          )
        }
      </div>
    </>
  )
}

export default User