import React, { useState } from 'react'
import Auth from '../../components/Auth'
import { useHistory } from 'react-router-dom'
//import { login } from '../api'
import { loginUser, useAuthDispatch, useAuthState } from '../../context'
const initialState = { email: '', password: '' }
const Login = () => {
  const [loginData, setLoginData] = useState(initialState)
  //console.log(loginData)
  const history = useHistory()
  const dispatch = useAuthDispatch()
  const { loading } = useAuthState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await loginUser(dispatch, loginData)
      if (!response) {
        return
      } else {
        history.push('/users/home')
      }
      //await login(loginData)
      //localStorage.setItem('firstLogin', true)
    } catch (error) {
      console.log(error, 'fgdfgdfg')
    }
  }

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <Auth />
      <div className='bg-red-200 mx-auto w-96 rounded-lg  justify-center mt-20'>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='px-5 py-2 mx-16 text-center'>
              <label htmlFor='email-input'>Email </label>
              <input
                id='email-input'
                name='email'
                onChange={handleChange}
                className='rounded-md'
                type='email'
                placeholder='Enter Email'
                disabled={loading}
              />
            </div>
            <div className='px-5 py-2 mx-16 text-center'>
              <label htmlFor='password-input'>Password</label>
              <input
                id='password-input'
                name='password'
                onChange={handleChange}
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
                Login
              </button>
            </div>
            <div className='p-3 text-center  text-white'></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
