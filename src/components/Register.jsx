import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Register() {
  let navigate = useNavigate()
  const [err, setErr] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      updateProfile(auth.currentUser, { displayName: data.name })
      navigate('/')
    } catch (error) {
      console.log(error)
      setErr(error)
    }
  }
  return (
    <>
      <Header />
      <div
        className='flex items-center justify-center'
        style={{ height: '100vh' }}
      >
        <div
          className='border-collapse border-sky-500 border-2 rounded-md 
              shadow-xl shadow-sky-300 
              w-1/3 py-4 px-14'
        >
          <p className='block text-center text-2xl text-sky-600'>
            Create your account now!
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              placeholder='Name'
              className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-2 block w-full mx-auto'
              {...register('name', {
                required: true,
                onChange: () => {
                  setErr('')
                },
              })}
            />
            {errors.name?.type === 'required' && (
              <p className='text-red-500'>Name is required.</p>
            )}

            <input
              type='email'
              placeholder='Email'
              className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-4 block w-full mx-auto'
              {...register('email', {
                required: true,
                onChange: () => {
                  setErr('')
                },
              })}
            />
            {errors.email && <p className='text-red-500'>Email is required.</p>}

            <input
              type='password'
              placeholder='Password'
              className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-4 block w-full  mx-auto'
              {...register('password', {
                required: true,
                minLength: 6,
                onChange: () => {
                  setErr('')
                },
              })}
            />
            {errors.password?.type === 'required' && (
              <p className='text-red-500'>Password is required.</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className='text-red-500'>Password too short.</p>
            )}

            {err !== '' && (
              <p className='text-red-500'>This email already exists</p>
            )}

            <button
              className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-2 block w-1/2 mx-auto bg-sky-400 hover:bg-sky-200 font-bold '
              type='submit'
            >
              Register
            </button>

            <p className='text-center mt-4 text-gray-500'>
              Already have an account?
              <Link to='/login' className='text-sky-500 font-bold'>
                {' '}
                Login.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
