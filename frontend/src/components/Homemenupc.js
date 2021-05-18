import React from 'react'
import { Link } from 'react-router-dom'

const Homemenupc = () => {
  return (
    <div className='container mx-auto'>
      <div className='mt-20 flex flex-wrap items-center justify-center text-center'>
        <Link to='/firebase' className='link'>
          <div>
            <div>
              <h2>FireBase</h2>
            </div>
          </div>
        </Link>
        <Link to='/localstorage' className='link'>
          <div>
            <div>
              <h2>Local Storage</h2>
            </div>
          </div>
        </Link>
        <Link to='/mongodb' className='link'>
          <div>
            <div>
              <h2>MongoDB</h2>
            </div>
          </div>
        </Link>
        <Link to='/localfile' className='link'>
          <div>
            <div>
              <h2>Local File</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Homemenupc
