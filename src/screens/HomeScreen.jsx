import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

import { db } from '../firebaseConfig'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

import Loading from '../components/Loading'
import Header from '../components/Header'
import Article from '../components/Article'
import AddArticle from '../components/AddArticle'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
  const [user] = useAuthState(auth)
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      <ToastContainer />
      <Helmet>
        <title>Blog World</title>
      </Helmet>
      <div className='container px-20 py-5 mt-20'>
        <div className='grid grid-cols-3 '>
          <div className='col-span-2 px-40'>
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
                <Article key={article.id} article={article} />
              ))
            )}
          </div>
          <div>
            {user ? (
              <>
                <AddArticle />
              </>
            ) : (
              <div className='border-2 border-sky-400 p-2 rounded-md'>
                <Link to='/login' className='text-sky-600 font-bold block'>
                  Login to create article
                </Link>
                <p className='inline-block'>Don't have an account? </p>
                <Link
                  to='/register'
                  className='text-sky-600 font-bold inline-block pl-1'
                >
                  Singup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
