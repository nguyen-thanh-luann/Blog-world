import React from 'react'

export default function Article({ article }) {
  return (
    <div className="border-dotted border-2 border-sky-500 p-2">
      <h2>{article.title}</h2>
    </div>
  )
}
