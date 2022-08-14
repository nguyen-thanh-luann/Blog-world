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
    px-9 py-4 
    fixed top-0 left-0 right-0 flex justify-between
    border-b-2'
    >
      <div>
        <Link to='/' className='uppercase text-2xl'>
          Blog World
        </Link>
      </div>
      <div className='text-center'>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-2xl hover:text-black'
        >
          Home
        </Link>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-black hover:text-2xl ml-2'
        >
          About
        </Link>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-black hover:text-2xl ml-2'
        >
          Travel
        </Link>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-black hover:text-2xl ml-2'
        >
          Fashion
        </Link>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-black hover:text-2xl ml-2'
        >
          Relax
        </Link>
        <Link
          to='/'
          className='text-lg text-gray-500 hover:text-black hover:text-2xl ml-2'
        >
          Music
        </Link>
        <div className='inline-block ml-4 border-b-2 px-2'>
          <input
            className='text-sm focus:outline-none'
            placeholder='Search...'
            onKeyUp={(e) => {
              searchHandle(e)
            }}
          />
          <i className='fa-solid fa-magnifying-glass text-sm text-gray-500'></i>
        </div>
      </div>
      <div>
        {user ? (
          <div>
            <Link
              to='/userInfo'
              style={{ fontSize: '1.2rem', marginRight: '1rem' }}
            >
              <i className='fa-solid fa-user'></i>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to='/login'
              style={{ fontSize: '1.2rem', marginRight: '1rem' }}
            >
              Login
            </Link>
            <Link to='/register' style={{ fontSize: '1.2rem' }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
