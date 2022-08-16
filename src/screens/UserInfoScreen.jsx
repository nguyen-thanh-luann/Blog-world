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
  const articleRef = collection(db, 'Articles')
  const q = query(articleRef, orderBy('createdAt', 'desc'))
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

  return (
    <div>
      <Header />
      <Helmet>
        <title>User info</title>
      </Helmet>
      <div className='container px-20 py-5 mt-20'>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        <button
          className='border-2 border-red-700 rounded-sm p-1 bg-red-400 text-white font-bold'
          onClick={() => {
            signOut(auth)
            navigate('/')
          }}
        >
          Logout
        </button>
      </div>

      {/* blog list */}
      <div className='container w-2/4 py-5 mx-auto'>
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
            <div className='mt-4 first:mt-1'>
              {article.userId === user.uid && (
                <Article key={article.id} article={article} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
