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
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  const [image, setImage] = useState('')
  const [bookProperties, setBookProperties] = useState({
    bookName: '',
    writerName: '',
    pageNumber: '',
  })
  //const [uploadUrl, setUploadUrl] = useState('')
  let id
  //Function for submit button
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
        setLoading(true)
        if (image.size < 3000000) {
          if (
            image.type === 'image/jpeg' ||
            image.type === 'image/png' ||
            image.type === 'image/jpg'
          ) {
            setInfo('Uploading')
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
            const uploadResult = result.eager[0].secure_url

            id = new Date().getTime().toString()
            const newBook = {
              id: id,
              bookName: bookProperties.bookName,
              writerName: bookProperties.writerName,
              pageNumber: bookProperties.pageNumber,
              uploadUrl: uploadResult,
            }

            setList([...list, newBook])
            setBookProperties({ bookName: '', writerName: '', pageNumber: '' })
            setInfo('Book created')
            setImage('')
            setLoading(false)
          } else {
            setLoading(false)
            setInfo('image type must be jpg, jpeg or png')
          }
        } else {
          setLoading(false)
          setInfo('file size is bigger than 3mb')
        }
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
    setImage('')
    localStorage.setItem('liste', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInfo('')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [info])

  return (
    <div>
      <CreateBook
        handleSubmit={handleSubmit}
        info={info}
        setImage={setImage}
        bookProperties={bookProperties}
        setBookProperties={setBookProperties}
        loading={loading}
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
