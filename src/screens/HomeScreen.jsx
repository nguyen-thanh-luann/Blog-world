import React from 'react'
import Header from '../components/Header'
import Article from '../components/Article'
import AddArticle from '../components/AddArticle'
export default function HomeScreen() {
  return (
    <div>
      <Header />
      <div className='container px-20 py-5'>
        <div className='grid grid-cols-3 '>
          <div className='col-span-2'>
            <Article />
          </div>
          <div>
            <AddArticle />
          </div>
        </div>
      </div>
    </div>
  )
}
