import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { toast } from 'react-toastify'
export default function Header() {
  const [user] = useAuthState(auth)

  const searchHandle = (e) => {
    if (e.key === 'Enter') {
      toast.success('Comming soon!!!')
    } else {
      return
    }
  }

  return (
    <div
      className='text-black bg-white
    px-1 py-4 md:px-10 lg:px-10 xl:px-10
    fixed top-0 left-0 right-0 flex justify-between
    border-b-2'
    >
      <div>
        <Link to='/' className='uppercase text-xl md:text-2xl'>
          Blog World
        </Link>
      </div>
      <div className='flex'>
        <Link to='/' className='text-gray-500 hover:text-black'>
          Home
        </Link>
        <Link to='/' className='text-gray-500 hover:text-black ml-2'>
          About me
        </Link>
        <div className='ml-4 border-b-2 px-2 mr-4 hidden md:block lg:block xl:block'>
          <input
            className='text-sm focus:outline-none'
            placeholder='Search...'
            onKeyUp={(e) => {
              searchHandle(e)
            }}
          />
          <i className='fa-solid fa-magnifying-glass text-sm text-gray-500'></i>
        </div>
        {/* {user ? (
          <div>
            <Link to='/userInfo' className='ml-2 text-lg'>
              <i className='fa-solid fa-user'></i>
            </Link>
          </div>
        ) : (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )} */}
        {
          <div>
            <Link
              to={`${user ? '/userInfo' : '/login'}`}
              className='ml-2 text-lg'
            >
              <i className='fa-solid fa-user'></i>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}
