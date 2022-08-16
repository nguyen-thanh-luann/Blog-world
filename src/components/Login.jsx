import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function Login() {
  let navigate = useNavigate()
  const [err, setErr] = useState('')
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
      console.log(`error: ${error}`)
      setErr(error)
    }
  }
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          className='border-collapse border-sky-500 border-2 rounded-md
        shadow-xl shadow-sky-300
        py-4 px-14
        w-1/3
       '
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className='text-2xl text-sky-600 text-center'>Login</p>
            <div className='mt-2 w-full'>
              <input
                type='email'
                placeholder='Email'
                className='border-collapse border-2 border-sky-300 rounded-md p-1 w-full'
                {...register('email', {
                  required: true,
                  onChange: () => {
                    setErr('')
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500'>Email is required.</p>
              )}
            </div>

            <div className='mt-4'>
              <input
                type='password'
                placeholder='Password'
                className='border-collapse border-2 border-sky-300 rounded-md p-1 w-full'
                {...register('password', {
                  required: true,
                  onChange: () => {
                    setErr('')
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500'>Password is required.</p>
              )}
              {err !== '' && (
                <p className='text-red-500'>Email or Password wrong</p>
              )}
            </div>

            <div className='text-center'>
              <button
                className='border-collapse border-2 border-sky-300 rounded-md p-1 bg-sky-400 hover:bg-sky-200 font-bold mt-2 w-1/2'
                type='submit'
              >
                Login
              </button>
            </div>
            <p className='text-center mt-4 text-gray-500'>
              New to Blog World?
              <Link to='/register' className='text-sky-500 font-bold'>
                {' '}
                Create an account.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
