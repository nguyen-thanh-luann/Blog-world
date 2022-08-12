import React from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Header from './Header'

export default function Login() {
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate('/')
      toast.success('login success!!!')
    } catch (error) {
      console.log(error)
      toast.error('somthing went wrong!')
    }
  }
  return (
    <>
      <Header />
      <div className='border-collapse border-sky-500 border-2 rounded-md mt-24 p-4 my-4 mx-auto w-1/2'>
        <p className='block text-center text-2xl text-sky-600'>Login</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            placeholder='Email'
            className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-2 block w-1/2 mx-auto'
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-red-500'>Email is required.</p>}

          <input
            type='password'
            placeholder='Password'
            className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-2 block w-1/2 mx-auto'
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className='text-red-500'>Password is required.</p>
          )}

          <button
            className='border-collapse border-2 border-sky-300 rounded-md p-1 mt-2 block w-1/2 mx-auto bg-sky-200 font-bold '
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </>
  )
}
