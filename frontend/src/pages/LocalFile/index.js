import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateBook from '../../components/CreateBook'
import BookList from '../../components/BookList'

const LocalFile = () => {
  const [list, setList] = useState([])
  const [bookProperties, setBookProperties] = useState({
    bookName: '',
    writerName: '',
    pageNumber: '',
  })
  const [info, setInfo] = useState('')
  let id

  //Function for submit button
  const handleSubmit = (e) => {
    e.preventDefault()

    // conditions for fill the blanks
    if (
      !bookProperties.bookName ||
      !bookProperties.writerName ||
      !bookProperties.pageNumber
    ) {
      setInfo('Please fill the blanks')
    } else {
      id = new Date().getTime().toString()
      const newBook = {
        id: id,
        bookName: bookProperties.bookName,
        writerName: bookProperties.writerName,
        pageNumber: bookProperties.pageNumber,
      }
      setList([...list, newBook])
      setBookProperties({ bookName: '', writerName: '', pageNumber: '' })
      setInfo('Book created')
      axios.post(
        'https://whispering-island-87382.herokuapp.com/books/localfile',
        [...list, newBook]
      )
    }
  }

  const removeSpecificBook = (id) => {
    setList(list.filter((book) => book.id !== id))
    axios.post(
      'https://whispering-island-87382.herokuapp.com/books/localfile/removespecific',
      list.filter((book) => book.id !== id)
    )
  }

  const removeAllBooks = () => {
    setList([])
    axios.post(
      'https://whispering-island-87382.herokuapp.com/books/localfile/removeall',
      [{}]
    )
  }

  useEffect(() => {
    axios
      .get('https://whispering-island-87382.herokuapp.com/books/localfile')
      .then((allBooks) => {
        setList(allBooks.data)
      })
  }, [])

  return (
    <div>
      <CreateBook
        handleSubmit={handleSubmit}
        info={info}
        bookProperties={bookProperties}
        setBookProperties={setBookProperties}
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
