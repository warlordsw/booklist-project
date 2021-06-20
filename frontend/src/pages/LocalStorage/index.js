import React, { useState, useEffect } from 'react'
import BookList from '../../components/BookList'
import CreateBook from '../../components/CreateBook'

const getLocalStorage = () => {
  let list = localStorage.getItem('liste')
  if (list) {
    return JSON.parse(localStorage.getItem('liste'))
  } else {
    return []
  }
}

const LocalStorage = () => {
  //state hooks
  const [list, setList] = useState(getLocalStorage)
  const [bookName, setBookName] = useState('')
  const [writerName, setWriterName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [info, setInfo] = useState('')
  const [image, setImage] = useState('')
  //const [uploadUrl, setUploadUrl] = useState('')
  let id

  //Function for submit button
  const handleSubmit = async (e) => {
    e.preventDefault()
    // conditions for fill the blanks
    if (!bookName || !writerName || !pageNumber || !image) {
      setInfo('Please fill the blanks')
    } else {
      try {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'book-list-project')
        data.append('cloud_name', 'book-list')
        let response = await fetch(
          'https://api.cloudinary.com/v1_1/book-list/image/upload',
          {
            method: 'POST',
            body: data,
          }
        )
        let result = await response.json()
        const uploadResult = result.url
        id = new Date().getTime().toString()
        const newBook = {
          id: id,
          bookName: bookName,
          writerName: writerName,
          pageNumber: pageNumber,
          uploadUrl: uploadResult,
        }

        setList([...list, newBook])
        setBookName('')
        setWriterName('')
        setPageNumber('')
        setInfo('Book created')
        setImage('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  //Function for remove specific book from local storage - It is inactive now
  const removeSpecificBook = (id) => {
    setList(list.filter((book) => book.id !== id))
  }

  // Function for clear all books from local storage - It is inactive now
  const removeAllBooks = () => {
    setList([])
  }

  // Render hook - It is working when rendering happens. - [list] means it is only working when list changes.
  useEffect(() => {
    localStorage.setItem('liste', JSON.stringify(list))
  }, [list])

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
        setImage={setImage}
      />

      <BookList
        items={list}
        removeSpecificBook={removeSpecificBook}
        removeAllBooks={removeAllBooks}
      />
    </div>
  )
}

export default LocalStorage
