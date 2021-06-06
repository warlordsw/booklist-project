import React, { useState } from 'react'
import Auth from '../../components/Auth'
import { useHistory } from 'react-router-dom'
//import { login } from '../api'
import { loginUser, useAuthDispatch, useAuthState } from '../../Context'
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
      <div className='bg-red-200 mx-auto w-96 rounded-lg flex justify-center mt-20'>
        <div>
          <div className='p-3 text-center'>
            <h6>Email </h6>
            <input
              name='email'
              onChange={handleChange}
              className='rounded-md'
              type='email'
              placeholder='Enter Email'
              disabled={loading}
            />
          </div>
          <div className='p-3 text-center'>
            <h6>Password</h6>
            <input
              name='password'
              onChange={handleChange}
              className='rounded-md'
              type='password'
              placeholder='Enter Password'
              disabled={loading}
            />
          </div>
          <div className='flex justify-center p-3'>
            <form>
              <button
                onClick={handleSubmit}
                className='bg-blue-500 py-3 px-6 rounded-full text-white'
                disabled={loading}
              >
                Login
              </button>
            </form>
          </div>
          <div className='p-3 text-center  text-white'></div>
        </div>
      </div>
    </div>
  )
}

export default Login
