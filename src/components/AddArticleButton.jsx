import React from 'react'
import { toast } from 'react-toastify'

export default function AddArticleButton() {
  const handleAdd = () => {
    toast.success('Comming soon!')
  }
  return (
    <div
      className='border-2 rounded-full p-4 border-sky-500 
    text-white font-bold text-sm 
    bg-sky-400
    hover:cursor-pointer hover:bg-sky-300
    fixed bottom-10 right-10 '
      onClick={() => handleAdd()}
    >
      <i className='fa-solid fa-pen-to-square'></i>
    </div>
  )
}
