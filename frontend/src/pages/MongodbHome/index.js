import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useAuthDispatch,
  logout,
  useAuthState,
  createBook,
  removeAll,
  removeSpecific,
} from '../../context'
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
  const [bookProperties, setBookProperties] = useState({
    bookName: '',
    writerName: '',
    pageNumber: '',
  })
  const [info, setInfo] = useState('')
  const [image, setImage] = useState('')
  let id
  const history = useHistory()
  const userDetails = useAuthState()
  const dispatch = useAuthDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // conditions for fill the blanks
    if (
      !bookProperties.bookName ||
      !bookProperties.writerName ||
      !bookProperties.pageNumber ||
      !image
    ) {
      setInfo('Please fill the blanks')
    } else {
      try {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'book-list-project')
        data.append('cloud_name', 'book-list')
        let imgresponse = await fetch(
          'https://api.cloudinary.com/v1_1/book-list/image/upload',
          {
            method: 'POST',
            body: data,
          }
        )
        let result = await imgresponse.json()
        const uploadResult = result.url
        id = new Date().getTime().toString()
        const newBook = {
          id: id,
          bookName: bookProperties.bookName,
          writerName: bookProperties.writerName,
          pageNumber: bookProperties.pageNumber,
          uploadUrl: uploadResult,
        }
        let response = await createBook(dispatch, {
          newBook: newBook,
          _id: userDetails.userId,
          token: userDetails.token,
        })
        if (!response) {
          localStorage.removeItem('currentUser')
          history.push('/login')
          return
        }

        setList([...list, newBook])
        setBookProperties({ bookName: '', writerName: '', pageNumber: '' })
        setInfo('Book created')
        setImage('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeAllBooks = async () => {
    try {
      let response = await removeAll(dispatch, {
        emptyArray: [],
        _id: userDetails.userId,
        token: userDetails.token,
      })
      if (!response) {
        localStorage.removeItem('currentUser')
        history.push('/login')
        return
      }

      setList([])
    } catch (error) {
      console.log(error)
    }
  }

  const removeSpecificBook = async (id) => {
    try {
      let response = await removeSpecific(dispatch, {
        createdBooks: list.filter((book) => book.id === id)[0],
        _id: userDetails.userId,
        token: userDetails.token,
      })

      if (!response) {
        localStorage.removeItem('currentUser')
        history.push('/login')
        return
      }
      setList(list.filter((book) => book.id !== id))
    } catch (error) {
      console.log(error)
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
          handleSubmit={handleSubmit}
          bookProperties={bookProperties}
          setBookProperties={setBookProperties}
          setImage={setImage}
        />
        {loading ? (
          <h1 className='text-6xl text-center mt-10 text-white'>Loading...</h1>
        ) : (
          <BookList
            items={list}
            removeAllBooks={removeAllBooks}
            removeSpecificBook={removeSpecificBook}
          />
        )}
      </div>
    </div>
  )
}
export default Mongodbhome
