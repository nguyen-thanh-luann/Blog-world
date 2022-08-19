import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { db, storage } from '../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

export default function AddArticle() {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useAuthState(auth)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    createdAt: Timestamp.now().toDate(),
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }
  const handleSubmit = () => {
    console.log(formData)
    if (!formData.title || !formData.description || !formData.image) {
      alert('Please fill all the fields')
      return
    }

    setIsLoading(true)

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    )
    const uploadImage = uploadBytesResumable(storageRef, formData.image)

    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progressPercent)
      },
      (err) => {
        console.log(err)
      },
      () => {
        setFormData({
          title: '',
          description: '',
          image: '',
        })
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, 'Articles')
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast('New Article post success!', { type: 'success' })
              setProgress(0)
            })
            .catch((err) => {
              toast('Post fail, something went wrong :(', { type: 'error' })
            })
        })
      }
    )
    navigate('/')
    setIsLoading(false)
  }
  return (
    <div
      className='border-solid border-2 border-sky-500
      shadow-2xl shadow-sky-700
    rounded-lg
    bg-white
    p-4 
    '
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl'>Add new article</h2>
        <FaTimes
          className='text-xl text-red-500 hover:cursor-pointer'
          onClick={() => {
            navigate('/')
          }}
        />
      </div>

      <div className='mt-2'>
        <label htmlFor='title'>Title</label>
        <div>
          <input
            id='title'
            name='title'
            type='text'
            value={formData.title}
            onChange={(e) => handleChange(e)}
            className='border-solid border-2 border-sky-800 rounded-md w-full'
          />
        </div>
      </div>

      <div className='mt-2'>
        <label htmlFor='description'>Description</label>
        <div>
          <textarea
            id='description'
            name='description'
            className='border-solid border-2 border-sky-800 rounded-md w-full'
            rows={5}
            onChange={(e) => handleChange(e)}
            value={formData.description}
          ></textarea>
        </div>
      </div>

      <div className='mt-2'>
        <label htmlFor='image'>Image</label>
        <div>
          <input
            id='image'
            name='image'
            type='file'
            onChange={(e) => handleImageChange(e)}
            className='border-solid border-2 border-sky-800 rounded-md w-full'
          />
        </div>
      </div>

      {progress === 0 ? null : (
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 text-end'>
          <div
            className='bg-purple-600 h-2.5 rounded-full dark:bg-purple-500'
            style={{ width: `${progress}%` }}
          ></div>
          {progress}%
        </div>
      )}

      <div className='w-full text-center'>
        {isLoading && (
          <div className='pt-2'>
            <Loading />
          </div>
        )}

        <button
          className='bg-sky-500 py-2 mt-2 w-52 m-auto 
        rounded-md text-white font-bold text-xl
        hover:bg-sky-400
        active:bg-sky-600
        '
          onClick={() => handleSubmit()}
        >
          Post
        </button>
      </div>
    </div>
  )
}
