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
          <div className='grid grid-rows-3 grid-flow-col'>
            <Helmet>
              <title>{article.title}</title>
            </Helmet>
            <div className='row-span-3'>
              <img src={article.imageUrl} alt='' style={{ width: '10rem' }} />
            </div>
            <div className='col-span-10'>
              <p>{article.title}</p>
            </div>
            <div className='row-span-2 col-span-10'>
              <p>{article.description}</p>
            </div>
          </div>
          <div className='pt-2'>
            <h2 className='text-sky-500'>Comments</h2>
            <div className='grid grid-flow-col'>
              <div>
                {comments.length === 0 ? (
                  <div>
                    <h3>No Comment</h3>
                  </div>
                ) : (
                  <div>
                    {comments.map((cmt) => (
                      <div key={cmt.commentId}>
                        <p>
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
              <div>
                {currentUser && (
                  <div>
                    <input
                      type='text'
                      className='border-collapse border-2 text-black border-sky-500 rounded-md'
                      placeholder='Comment here...'
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
