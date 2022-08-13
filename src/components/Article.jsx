import React from 'react'
import DeleteArticle from './DeleteArticle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Article({ article }) {
  let navigate = useNavigate()
  const [user] = useAuthState(auth)
  const likesRef = doc(db, 'Articles', article.id)

  const handleLike = () => {
    if (!user) {
      if (window.confirm('Login to like')) {
        navigate('/login')
      } else {
        return
      }
    } else {
      if (article.likes?.includes(user.uid)) {
        updateDoc(likesRef, {
          likes: arrayRemove(user.uid),
        })
          .then(() => {
            toast.success('unliked')
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        updateDoc(likesRef, {
          likes: arrayUnion(user.uid),
        })
          .then(() => {
            toast.success('liked')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  return (
    <div
      className='grid grid-rows-3 grid-flow-col 
    border-solid border-4 border-sky-500
    rounded-lg
    p-2 mt-5 first:mt-0'
    >
      <div className='row-span-3'>
        <img src={article.imageUrl} alt='' style={{ width: '10rem' }} />
        <p>{`Created by ${article.createdBy}`}</p>
      </div>
      <div className='col-span-10 '>
        <div className='flex justify-between'>
          <p className='text-xl'>{article.title}</p>
          {user && user.uid === article.userId && (
            <DeleteArticle
              id={article.id}
              imageUrl={article.imageUrl}
              className='text-end'
            />
          )}
        </div>
        <p>{article.createdAt.toDate().toDateString()}</p>
      </div>
      <div className='row-span-2 col-span-10 flex flex-col justify-between'>
        <p className=''>{article.description}</p>
        <p className='text-end'>
          {article.likes.length === 0 ? (
            <>
              <i
                className='fa-solid fa-heart text-black hover:cursor-pointer'
                onClick={() => handleLike()}
              ></i>
            </>
          ) : (
            <>
              <i
                className='fa-solid fa-heart text-red-500 hover:cursor-pointer'
                onClick={() => handleLike()}
              ></i>
              <span className='p-1'>{article.likes.length}</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
