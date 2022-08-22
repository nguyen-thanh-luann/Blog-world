import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { Helmet } from 'react-helmet-async'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

import Header from '../components/Header'
import Loading from '../components/Loading'
import Article from '../components/Article'

export default function UserInfoScreen() {
  const [articles, setArticles] = useState([])
  const [user] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    const articleRef = collection(db, 'Articles')
    const q = query(articleRef, orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setArticles(articles)
      setIsLoading(false)
    })
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure logout?')) {
      signOut(auth)
      navigate('/')
    } else {
      return
    }
  }
  return (
    <>
      {user && (
        <div>
          <Header />
          <Helmet>
            <title>User info</title>
          </Helmet>
          {/* user Info */}
          <div
            className='container 
      px-2 py-4 mt-20
      border-b border-sky-300 shadow-lg bg-white
      flex flex-col items-center
      '
          >
            <div className='w-52 md:w-1/5'>
              <img
                src={
                  'https://res.cloudinary.com/imthanhluan/image/upload/v1660192190/cld-sample-3.jpg'
                }
                alt=''
                className='w-full'
                style={{
                  borderTopRightRadius: '50%',
                  borderBottomLeftRadius: '50%',
                  // clipPath: 'circle(75px at 50% 50%)',
                }}
              />
            </div>
            <p className='text-2xl font-bold'>{user.displayName}</p>
            <p className='text-lg'>{user.email}</p>
            <button
              className='border-2 border-sky-500 rounded-sm 
          my-2 px-4 w-3/5 md:w-1/5
          bg-sky-300 hover:bg-sky-500 text-gray-900 hover:text-white hover:font-bold'
              onClick={() => {
                window.alert('Comming soon')
              }}
            >
              Update
            </button>
            <button
              className='border-2 border-red-700 rounded-sm 
          px-4 w-3/5 md:w-1/5
          bg-red-300 hover:bg-red-500 text-gray-900 hover:font-bold hover:text-white'
              onClick={() => {
                handleLogout()
              }}
            >
              Logout
            </button>
          </div>

          {/* blog list */}
          <div
            className='container 
      lg:w-2/4 w-full md:w-full py-5 mx-auto'
          >
            {isLoading ? (
              <div>
                <Loading />
              </div>
            ) : articles.length === 0 ? (
              <div>
                <h3>No Article Found</h3>
              </div>
            ) : (
              articles &&
              articles.map((article) => (
                <div key={article.id} className='mt-4 first:mt-1'>
                  {article.userId === user.uid && (
                    <Article key={article.id} article={article} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
