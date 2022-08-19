import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { uuidv4 } from '@firebase/util'
import Footer from '../components/Footer'
import AddArticleButton from '../components/AddArticleButton'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState()
  const [currentUser] = useAuthState(auth)
  const commentRef = doc(db, 'Articles', id)
  useEffect(() => {
    const docRef = doc(db, 'Articles', id)
    onSnapshot(docRef, (snapshot) => {
      console.log(snapshot.data())
      setArticle({ ...snapshot.data(), id: snapshot.id })
      setComments(snapshot.data().comments)
    })
  }, [])

  const handleChangeComment = (e) => {
    if (e.key === 'Enter') {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentUser.uid,
          userName: currentUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment('')
      })
    }
  }

  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Header />
      {article && (
        <div className='mt-24 p-4'>
          <div className=''>
            <Helmet>
              <title>{article.title}</title>
            </Helmet>
            <AddArticleButton />
            <div className='h-96 w-full flex align-middle justify-center'>
              <img
                src={article.imageUrl}
                alt=''
                className='h-full rounded-md shadow-2xl'
              />
            </div>
            <div className='p-2 mt-1'>
              <p className='text-3xl'>{article.title}</p>
            </div>
            <div className='p-2'>
              <p>{article.description}</p>
            </div>
          </div>
          <div className='py-6 px-4 border'>
            <h2 className='text-sky-500'>Comments</h2>
            <div className=''>
              <div>
                {currentUser && (
                  <div className='text-center'>
                    <input
                      type='text'
                      className='border-collapse border-2 text-black border-sky-500 rounded-md p-1
                      w-80 md:w-96 lg:w-96'
                      placeholder='Write comment'
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value)
                      }}
                      onKeyUp={(e) => {
                        handleChangeComment(e)
                      }}
                    />
                  </div>
                )}
              </div>
              <div className='flex items-center justify-center mt-4'>
                {comments.length === 0 ? (
                  <div className='text-center'>
                    <h3>No Comment</h3>
                  </div>
                ) : (
                  <div>
                    {comments.map((cmt) => (
                      <div
                        key={cmt.commentId}
                        className='border border-sky-300 rounded-md 
                        px-3 py-1 mt-4 first:mt-2
                        w-80 md:w-96 lg:w-96
                        shadow-lg
                        '
                      >
                        <p className='flex justify-between'>
                          {cmt.userName}{' '}
                          {currentUser && cmt.user === currentUser.uid && (
                            <span
                              className='hover:cursor-pointer'
                              onClick={() => {
                                handleDeleteComment(cmt)
                              }}
                            >
                              &times;
                            </span>
                          )}
                        </p>
                        <p>{cmt.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
