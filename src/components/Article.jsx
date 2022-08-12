import React from 'react'
import DeleteArticle from './DeleteArticle'
export default function Article({ article }) {
  return (
    <div
      className='grid grid-rows-3 grid-flow-col 
    border-solid border-4 border-sky-500
    rounded-lg
    p-2 mt-5 first:mt-0'
    >
      <div className='row-span-3'>
        <img src={article.imageUrl} alt='' style={{ width: '10rem' }} />
      </div>
      <div className='col-span-10 '>
        <div className='flex justify-between'>
          <p className='text-xl'>{article.title}</p>
          <DeleteArticle
            id={article.id}
            imageUrl={article.imageUrl}
            className='text-end'
          />
        </div>
        <p>{article.createdAt.toDate().toDateString()}</p>
      </div>
      <div className='row-span-2 col-span-10'>
        <p className='py-4'>{article.description}</p>
      </div>
    </div>
  )
}
