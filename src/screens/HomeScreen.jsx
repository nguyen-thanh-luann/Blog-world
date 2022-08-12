import React, { useState, useEffect } from 'react'

import { db } from '../firebaseConfig'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

import Loading from '../components/Loading'
import Header from '../components/Header'
import Article from '../components/Article'
import AddArticle from '../components/AddArticle'
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
      <div className='container px-20 py-5'>
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
            <AddArticle />
          </div>
        </div>
      </div>
    </div>
  )
}
