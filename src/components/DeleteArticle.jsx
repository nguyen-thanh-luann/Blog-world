import React from 'react'
import { db, storage } from '../firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, 'Articles', id))
        toast('Article deleted successfully', { type: 'success' })
        //delete image
        const storageRef = ref(storage, imageUrl)
        await deleteObject(storageRef)
      } catch (error) {
        toast('Delete fail, some thing went wrong!', { type: 'error' })
        console.log(error)
      }
    } else {
      return
    }
  }

  return (
    <div>
      <button className='text-red-400' onClick={() => handleDelete()}>
        <i className='fa-solid fa-trash'></i>
      </button>
    </div>
  )
}
