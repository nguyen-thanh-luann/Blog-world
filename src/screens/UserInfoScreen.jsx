import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { Helmet } from 'react-helmet-async'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'

export default function UserInfoScreen() {
  const [user] = useAuthState(auth)
  let navigate = useNavigate()

  return (
    <div>
      <Header />
      <Helmet>
        <title>User info</title>
      </Helmet>
      <div className='container px-20 py-5 mt-20'>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <button
          className='border-2 border-red-700 rounded-sm p-1 bg-red-400 text-white font-bold'
          onClick={() => {
            signOut(auth)
            navigate('/')
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
