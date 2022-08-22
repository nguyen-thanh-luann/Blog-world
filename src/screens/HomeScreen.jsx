import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { db } from '../firebaseConfig'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

import Loading from '../components/Loading'
import Header from '../components/Header'
import Article from '../components/Article'
import Footer from '../components/Footer'

export default function HomeScreen() {
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
          <img
            src={require('../assets/image/banner1.jpg')}
            alt=''
            className='h-56 md:h-full lg:h-full'
          />
        </div>
        <div className='container lg:w-2/4 w-full md:w-full py-5 px-2 mx-auto'>
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

      <Footer />
    </div>
  )
}
