import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAuthDispatch,
  logout,
  useAuthState,
  createBook,
} from '../../Context'
import CreateBook from '../../components/CreateBook'
import BookList from '../../components/BookList'

const getLocalStorage = () => {
  let list = localStorage.getItem('currentUser')
  if (list) {
    return JSON.parse(localStorage.getItem('currentUser')).result.createdBooks
  } else {
    return []
  }
}

const Mongodbhome = () => {
  const [list, setList] = useState(getLocalStorage)
  const [loading, setLoading] = useState(false)
  const [bookName, setBookName] = useState('')
  const [writerName, setWriterName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [info, setInfo] = useState('')
  let id
  const history = useHistory()
  const userDetails = useAuthState()
  const dispatch = useAuthDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()

    // conditions for fill the blanks
    if (!bookName || !writerName || !pageNumber) {
      setInfo('Please fill the blanks')
    } else {
      id = new Date().getTime().toString()
      const newBook = {
        _id: userDetails.userId,
        id: id,
        bookName: bookName,
        writerName: writerName,
        pageNumber: pageNumber,
      }
      setList([...list, newBook])
      setBookName('')
      setWriterName('')
      setPageNumber('')
      setInfo('Book created')

      try {
        await createBook(dispatch, newBook)
      } catch (error) {}
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout(dispatch)
    history.push('/login')
  }

  return (
    <div>
      <div className='bg-blue-700 text-center text-6xl text-white p-3'>
        <h1>User : {userDetails.email}</h1>
      </div>
      <div className='flex justify-between p-3 bg-blue-600 text-white'>
        <h2 className='text-3xl '>Welcome {userDetails.userName} !</h2>
        <button
          onClick={handleLogout}
          className='bg-blue-500 py-3 px-6 rounded-full text-white'
        >
          Logout
        </button>
      </div>
      <div>
        <CreateBook
          info={info}
          bookName={bookName}
          writerName={writerName}
          pageNumber={pageNumber}
          handleSubmit={handleSubmit}
          setBookName={setBookName}
          setWriterName={setWriterName}
          setPageNumber={setPageNumber}
        />
        {loading ? (
          <h1 className='text-6xl text-center mt-10 text-white'>Loading...</h1>
        ) : (
          <BookList items={list} />
        )}
      </div>
    </div>
  )
}
export default Mongodbhome
