import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

export default function AddArticleButton() {
  let navigate = useNavigate()
  const [user] = useAuthState(auth)

  const handleAdd = () => {
    if (user) {
      navigate('/post')
    } else {
      navigate('/login')
    }
  }
  return (
    <>
      <button
        className='border-2 py-2 px-4 rounded-md border-sky-500
    text-sky-500 text-sm 
      bg-white
    hover:cursor-pointer hover:bg-sky-500 hover:text-white'
        data-modal-toggle='large-modal'
        onClick={() => handleAdd()}
      >
        Create post
      </button>
    </>
  )
}
