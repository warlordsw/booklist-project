import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateBook from '../../components/CreateBook'
import BookList from '../../components/BookList'

const LocalFile = () => {
  const [list, setList] = useState([])
  const [bookName, setBookName] = useState('')
  const [writerName, setWriterName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [info, setInfo] = useState('')
  let id

  //Function for submit button
  const handleSubmit = (e) => {
    e.preventDefault()

    // conditions for fill the blanks
    if (!bookName || !writerName || !pageNumber) {
      setInfo('Please fill the blanks')
    } else {
      id = new Date().getTime().toString()
      const newBook = {
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
      axios.post('https://lit-temple-41224.herokuapp.com/books/localfile', [
        ...list,
        newBook,
      ])
    }
  }

  const removeSpecificBook = (id) => {
    setList(list.filter((book) => book.id !== id))
    axios.post(
      'https://lit-temple-41224.herokuapp.com/books/localfile/removespecific',
      list.filter((book) => book.id !== id)
    )
  }

  const removeAllBooks = () => {
    setList([])
    axios.post(
      'https://lit-temple-41224.herokuapp.com/books/localfile/removeall',
      [{}]
    )
  }

  useEffect(() => {
    axios
      .get('https://lit-temple-41224.herokuapp.com/books/localfile')
      .then((allBooks) => {
        setList(allBooks.data)
      })
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
      <BookList
        items={list}
        removeSpecificBook={removeSpecificBook}
        removeAllBooks={removeAllBooks}
      />
    </div>
  )
}

export default LocalFile
