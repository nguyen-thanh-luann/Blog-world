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
        className='border-2 p-4 border-sky-500 
    text-white font-bold text-sm 
    bg-sky-400
    hover:cursor-pointer hover:bg-sky-300
    fixed bottom-10 right-10 '
        data-modal-toggle='large-modal'
        onClick={() => handleAdd()}
        style={{ borderRadius: '50%' }}
      >
        <i
          className='fa-solid fa-pen-to-square'
          style={{ clipPath: 'circle(75px at 50% 50%)' }}
        ></i>
      </button>
    </>
  )
}
