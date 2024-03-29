'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {}

const RegisterForm = (props: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    if(!name || !email || !password){
      setError('All fields are required')
      return
    }

    try {
      const resUserAxists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        }),

      })

      const {user} = await resUserAxists.json()
      if (user) {
        setError('user already exits')
        return
      }
      const response = await fetch('api/register', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email,password
          
        })

      })
      if(response.ok){
        const form = e.target
        form.reset()
        router.push('/')
      }
      else{
        console.log("User registration failed")
      }
    } catch (error) {
      console.log('error during registration: ',error)
    }

  }

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Register an account</h1>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
              <input onChange={(e)=>setName(e.target.value)} type='text' placeholder='Full Name'/>
              <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
              <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
              <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>Register</button>
              { error && (
                <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>
                )
              }
              <Link className='text-sm mt-3 text-right'
              href={'/login'}>
                Already registered? <span className='underline'>Login</span>
              </Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm