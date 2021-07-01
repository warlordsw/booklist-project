import React, { useState } from 'react'
import Auth from '../../components/Auth'
import { useHistory } from 'react-router-dom'
import { registerUser, useAuthDispatch, useAuthState } from '../../context'

const initialState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const [registerData, setRegisterData] = useState(initialState)
  const history = useHistory()
  const dispatch = useAuthDispatch()
  const { loading } = useAuthState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await registerUser(dispatch, registerData)
      if (!response) {
        return
      } else {
        history.push('/users/home')
      }
      // await register(registerData)
    } catch (error) {
      console.log(error, 'fgdfgdfg')
    }
  }

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Auth />
      <div>
        <div className='bg-red-200 mx-auto w-96 rounded-lg mt-20'>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='px-12 py-2 mx-12 text-center'>
                <label htmlFor='username-input'>Username</label>
                <input
                  id='username-input'
                  onChange={handleChange}
                  name='userName'
                  className='rounded-md'
                  type='text'
                  placeholder='Enter Username'
                  disabled={loading}
                />
              </div>
              <div className='px-12 py-2 mx-12 text-center'>
                <label htmlFor='email-input'>Email</label>
                <input
                  id='email-input'
                  onChange={handleChange}
                  name='email'
                  className='rounded-md'
                  type='email'
                  placeholder='Enter Email'
                  disabled={loading}
                />
              </div>
              <div className='px-12 py-2 mx-12 text-center'>
                <label htmlFor='password-input'>Password</label>
                <input
                  id='password-input'
                  onChange={handleChange}
                  name='password'
                  className='rounded-md'
                  type='password'
                  placeholder='Enter Password'
                  disabled={loading}
                />
              </div>
              <div className='px-12 py-2 mx-12 text-center'>
                <label htmlFor='cf-pass-input'>Confirm Password</label>
                <input
                  id='cf-pass-input'
                  onChange={handleChange}
                  name='confirmPassword'
                  className='rounded-md'
                  type='password'
                  placeholder='Enter Password'
                  disabled={loading}
                />
              </div>
              <div className='flex justify-center p-3'>
                <button
                  className='bg-blue-500 py-3 px-6 rounded-full text-white'
                  disabled={loading}
                >
                  Register
                </button>
              </div>
              <div className='p-3 text-center  text-white'></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
