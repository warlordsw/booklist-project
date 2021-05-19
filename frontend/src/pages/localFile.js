import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocalFile = () => {
  const [list, setList] = useState([])

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
      axios.post('http://localhost:5000/books/localfile', [...list, newBook])
    }
  }

  const removeSpecificBook = (id) => {
    setList(list.filter((book) => book.id !== id))
    axios.post(
      'http://localhost:5000/books/localfile/removespecific',
      list.filter((book) => book.id !== id)
    )
  }

  const removeAllBooks = () => {
    setList([])
    axios.post('http://localhost:5000/books/localfile/removeall', [])
  }

  useEffect(() => {
    axios.get('http://localhost:5000/books/localfile').then((allBooks) => {
      setList(allBooks.data)
    })
  }, [])

  return (
    <div>
      <div>
        <nav className='bg-blue-500  text-center text-white px-6 py-3  mx-2'>
          Create Book
        </nav>
      </div>
      <div className='bg-red-200 mx-auto w-96 rounded-lg flex justify-center mt-20'>
        <div>
          <div className='p-3 text-center'>
            <h6>Enter Book Name</h6>
            <input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className='rounded-md'
              type='text'
              placeholder='Book Name'
            />
          </div>
          <div className='p-3 text-center'>
            <h6>Enter Writer Name</h6>
            <input
              value={writerName}
              onChange={(e) => setWriterName(e.target.value)}
              className='rounded-md'
              type='text'
              placeholder='Writer Name'
            />
          </div>
          <div className='p-3 text-center'>
            <h6>Enter Total Page Number </h6>
            <input
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
              className='rounded-md'
              type='number'
              placeholder='Page Number'
            />
          </div>
          <div className='flex justify-center p-3'>
            <form onSubmit={handleSubmit}>
              <button className='bg-blue-500 py-3 px-6 rounded-full text-white'>
                Submit
              </button>
            </form>
          </div>
          <div className='p-3 text-center  text-white'>
            <h3>{info}</h3>
          </div>
        </div>
      </div>
      <div>
        <Booklist items={list} removeSpecificBook={removeSpecificBook} />
      </div>
      {list.length > 1 && (
        <div className='flex justify-center my-5'>
          <button
            onClick={removeAllBooks}
            className='px-8 py-4 bg-red-500 rounded-full text-white'
          >
            Remove All
          </button>
        </div>
      )}
    </div>
  )
}

// Function for rendering book list
const Booklist = ({ items, removeSpecificBook }) => {
  return (
    <div className='container mx-auto'>
      <div className='mt-20 flex flex-wrap items-center justify-center'>
        {items.map((item) => {
          return (
            <div key={item.id} className='p-2 m-2 bg-yellow-100 w-1/4'>
              <div className='p-1'>
                <h5 className='font-semibold'>Book Name</h5>
                <h3>{item.title}</h3>
              </div>
              <div className='p-1'>
                <h5 className='font-semibold'>Writer Name</h5>
                <h3>{item.writer}</h3>
              </div>
              <div className='p-1'>
                <h5 className='font-semibold'>Total Page</h5>
                <h3>{item.pageCount}</h3>
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={() => removeSpecificBook(item.id)}
                  className='px-4 py-2 bg-red-500 rounded-full text-white'
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LocalFile
