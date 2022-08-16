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
import AddArticleButton from '../components/AddArticleButton'
import Footer from '../components/Footer'

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
      <div className=''>
        <div>
          <img src={require('../assets/image/banner1.jpg')} alt='' />
        </div>
        <div className='container w-2/4 py-5 mx-auto'>
          <div className=''>
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
        </div>
      </div>
      <AddArticleButton />
      <Footer />
    </div>
  )
}
