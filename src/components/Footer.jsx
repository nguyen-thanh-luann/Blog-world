import React from 'react'

export default function Footer() {
  return (
    <div className='p-4 border-t-2 bg-white text-black font-bold text-center '>
      <h2 className='mb-4 text-3xl text-gray-500'>Follow Me!</h2>
      <div>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
          className='text-gray-600 text-md'
        >
          <i className='fa-brands fa-square-facebook'></i>
        </a>
        <a
          href='https://t.me/imthanhluan'
          target='_blank'
          rel='noreferrer'
          className='text-gray-600 ml-2 text-md '
        >
          <i className='fa-brands fa-telegram'></i>
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
          className='text-gray-600 ml-2  text-md'
        >
          <i className='fa-brands fa-twitter'></i>
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
          className='text-gray-600 ml-2  text-md'
        >
          <i className='fa-brands fa-tiktok'></i>
        </a>
        <a
          href='https://www.facebook.com/imthanhluann'
          target='_blank'
          rel='noreferrer'
          className='text-gray-600 ml-2 text-md'
        >
          <i className='fa-brands fa-youtube'></i>
        </a>
      </div>
      <h6 className='mt-3 text-gray-500'>Made by Nguyen Thanh Luan</h6>
    </div>
  )
}
