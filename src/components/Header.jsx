import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { BiBell } from 'react-icons/bi'
import AddArticleButton from './AddArticleButton'

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
      <div className='flex items-center'>
        {user ? (
          <>
            <AddArticleButton />
            <div className='hover:bg-sky-200 ml-4 hover:cursor-pointer rounded-md p-2'>
              <BiBell className='text-xl' />
            </div>
            <Link to='/userInfo' className='w-8 ml-4'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1659500844/profileDefault_raklnm.png'
                alt=''
                className='w-full rounded-full border-sky-200 hover:border-2'
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/login'
              className='border px-4 py-2 rounded-md w-36 text-center bg-white border-sky-500 text-sky-500
              hover:text-white hover:bg-sky-500'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='border px-4 py-2 rounded-md w-36 text-center bg-white border-sky-500 text-sky-500
              hover:text-white hover:bg-sky-500 ml-4'
            >
              Create Account
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
