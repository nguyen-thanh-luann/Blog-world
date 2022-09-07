import React from 'react'
import AddArticle from '../components/AddArticle'

export default function PostArticleScreen() {
  return (
    <div className='p-4 h-screen'>
      <div className='w-full md:w-1/2 lg:w-1/2 mx-auto my-12'>
        <AddArticle />
      </div>
    </div>
  )
}
