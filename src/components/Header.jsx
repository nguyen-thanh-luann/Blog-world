import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

export default function Header() {
  const [user] = useAuthState(auth)

  return (
    <div className='text-2xl bg-black text-white px-9 py-4 fixed top-0 left-0 right-0 flex justify-between'>
      <Link to='/'>Blog World</Link>
      <div>
        {user ? (
          <div>
            <Link
              to='/userInfo'
              style={{ fontSize: '1.2rem', marginRight: '1rem' }}
            >
              User info
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
