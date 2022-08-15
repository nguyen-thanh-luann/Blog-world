import React from 'react'
import AddArticle from '../components/AddArticle'

export default function PostArticleScreen() {
  return (
    <div
      className='bg-gray-200'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ width: '40%' }}>
        <AddArticle />
      </div>
    </div>
  )
}
