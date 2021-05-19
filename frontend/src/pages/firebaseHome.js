import React, { useState, useEffect, useContext } from 'react'
import BookList from '../components/BookList'
import CreateBook from '../components/CreateBook'
import FirebaseContext from '../context/firebase'
import {
  getBookList,
  sendDatabase,
  removeAllBooks,
  removeSpecificBook,
} from '../functions/firebase.js'

const FireBaseHome = () => {
  //useContext hook
  const bookData = useContext(FirebaseContext)

  //state hooks
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookName, setBookName] = useState('')
  const [writerName, setWriterName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [info, setInfo] = useState('')

  //Function for submit button
  const handleSubmit = (e) => {
    e.preventDefault()

    // conditions for fill the blanks
    if (!bookName || !writerName || !pageNumber) {
      setInfo('Please fill the blanks')
    } else {
      const newBook = {
        id: new Date().getTime().toString(),
        title: bookName,
        writer: writerName,
        pageCount: pageNumber,
      }
      setList([...list, newBook])

      setBookName('')
      setWriterName('')
      setPageNumber('')
      setInfo('Book created')
      sendDatabase(bookData.firebase, bookName, writerName, pageNumber)
      getBookList(setLoading, setList, bookData)
    }
  }

  // Render hook - [] means only working on initial state.
  useEffect(() => {
    getBookList(setLoading, setList, bookData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <CreateBook
        bookName={bookName}
        writerName={writerName}
        pageNumber={pageNumber}
        handleSubmit={handleSubmit}
        info={info}
        setBookName={setBookName}
        setWriterName={setWriterName}
        setPageNumber={setPageNumber}
      />
      {loading ? (
        <h1 className='text-6xl text-center mt-10 text-white'>Loading...</h1>
      ) : (
        <BookList
          bookData={bookData}
          setList={setList}
          items={list}
          removeSpecificBook={removeSpecificBook}
          removeAllBooks={() => removeAllBooks(bookData, setLoading, setList)}
        />
      )}
    </div>
  )
}

export default FireBaseHome
