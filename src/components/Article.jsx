import React from 'react'
import DeleteArticle from './DeleteArticle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { doc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

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
          .then(() => {})
          .catch((err) => {
            console.log(err)
          })
      } else {
        updateDoc(likesRef, {
          likes: arrayUnion(user.uid),
        })
          .then(() => {})
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  return (
    <div
      className='grid grid-cols-6
    border-solid border-2 border-gray-300 rounded-lg
     mt-5 first:mt-0'
    >
      <div className='col-span-6 h-96'>
        <Link to={`/article/${article.id}`}>
          <img
            src={article.imageUrl}
            alt=''
            className='h-full w-full mx-auto rounded-tl-lg rounded-tr-lg'
          />
        </Link>
      </div>
      <div className='col-span-6 p-3 pb-0 flex items-center'>
        <div style={{ width: '3rem' }}>
          <img
            src={
              'https://res.cloudinary.com/imthanhluan/image/upload/v1660192190/cld-sample-3.jpg'
            }
            alt=''
            style={{
              width: '100%',
              borderTopLeftRadius: '30%',
              borderBottomRightRadius: '30%',
            }}
          />
        </div>
        <div className='ml-2'>
          <h2 className='text-lg font-bold'>{article.createdBy}</h2>
          <p>{article.createdAt.toDate().toDateString()}</p>
        </div>
      </div>
      <div className='col-span-6 px-2 py-3'>
        <h2 className='text-2xl font-bold'>{article.title}</h2>
        <p>{article.description}</p>
      </div>
      <div
        className='col-span-6 px-3 py-3 
      border-t-2 border-dotted border-gray-200
      flex justify-between'
      >
        <div>
          {article.likes.length === 0 ? (
            <>
              <AiOutlineHeart
                className='text-red-500 text-lg hover:cursor-pointer'
                onClick={() => handleLike()}
              />
            </>
          ) : user ? (
            article.likes?.includes(user.uid) ? (
              <div className='flex align-middle'>
                <AiFillHeart
                  className='text-red-500 text-lg hover:cursor-pointer'
                  onClick={() => handleLike()}
                />
                <span className='ml-1 text-sm'>{article.likes.length}</span>
              </div>
            ) : (
              <div className='flex align-middle'>
                <AiOutlineHeart
                  className='text-red-500 text-lg hover:cursor-pointer'
                  onClick={() => handleLike()}
                />
                <span className='ml-1 text-sm'>{article.likes.length}</span>
              </div>
            )
          ) : (
            <div className='flex align-middle'>
              <AiFillHeart
                className='text-red-500 text-lg hover:cursor-pointer'
                onClick={() => handleLike()}
              />
              <span className='ml-1 text-sm'>{article.likes.length}</span>
            </div>
          )}
        </div>
        <div>
          {article.comments.length === 0 ? (
            <>
              <FaRegCommentDots />
            </>
          ) : (
            <div className='flex align-middle'>
              <FaRegCommentDots />
              <span className='ml-1 text-sm'>{`${article.comments.length} comments`}</span>

              {user && user.uid === article.userId && (
                <div className='ml-2 relative'>
                  {/* <DeleteArticle id={article.id} imageUrl={article.imageUrl} />
                  > */}
                  <BsThreeDots className='hover:cursor-pointer ml-2' />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
