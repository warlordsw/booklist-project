import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div>
      <div>
        <nav className='bg-blue-500  flex  text-center text-white px-6 py-3'>
          <Link to='/login' className='px-3'>
            <div>
              <div>
                <h2>Login</h2>
              </div>
            </div>
          </Link>
          <Link to='/register' className='px-3'>
            <div>
              <div>
                <h2>Register</h2>
              </div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Auth
