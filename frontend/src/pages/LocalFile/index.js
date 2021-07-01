import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateBook from '../../components/CreateBook'
import BookList from '../../components/BookList'

const LocalFile = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookProperties, setBookProperties] = useState({
    bookName: '',
    writerName: '',
    pageNumber: '',
  })
  const [info, setInfo] = useState('')
  const [image, setImage] = useState('')
  const [isUploaded, setIsUploaded] = useState(true)
  const [uploadInfo, setUploadInfo] = useState({ uploading: false, info: '' })

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
            setIsUploaded(false)
            setUploadInfo({ uploading: true, info: 'Uploading' })
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
            axios.post(
              'https://whispering-island-87382.herokuapp.com/books/localfile',
              [...list, newBook]
            )
            setIsUploaded(true)
            setLoading(false)
            setUploadInfo({ uploading: false, info: '' })
          } else {
            setLoading(false)
            setInfo('image type must be jpg, jpeg or png')
          }
        } else {
          setLoading(false)
          setInfo('file size is bigger than 3mb')
        }
      } catch (error) {}
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
        bookProperties={bookProperties}
        setBookProperties={setBookProperties}
        setImage={setImage}
        loading={loading}
        isUploaded={isUploaded}
        uploadInfo={uploadInfo}
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
