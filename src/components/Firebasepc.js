import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

// Render component - page content
const Firebasepc = () => {
  //useContext hook
  const bookData = useContext(FirebaseContext)

  //state hooks
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  // Function for get all document data from Firestore database and map it.
  const getBookList = () => {
    const getDatabase = async () => {
      const snapshot = await bookData.firebase
        .firestore()
        .collection('books')
        .get()
      const result = await snapshot.docs.map((item) => item.data())
      setLoading(false)
      setList(result)
    }
    return getDatabase()
  }

  // Function for delete all books from Firestore database documents.
  const removeAllBooks = async () => {
    const db = await bookData.firebase.firestore()
    const getId = await db.collection('books').get()
    const result = await getId.docs.map((item) => item.id)
    for (let i = 0; i < result.length; i++) {
      await db.collection('books').doc(`${result[i]}`).delete()
    }
    return await getBookList()
  }
  //state hooks
  const [bookName, setBookName] = useState('')
  const [writerName, setWriterName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [info, setInfo] = useState('')

  //Function for send data to Firestore when onSubmit. It is working in handleSubmit method
  async function sendDatabase(firebase) {
    await firebase.firestore().collection('books').doc(bookName).set({
      id: new Date().getTime().toString(),
      bookName: bookName,
      writerName: writerName,
      pageNumber: pageNumber,
    })
  }

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
      sendDatabase(bookData.firebase)
      getBookList()
    }
  }

  // //Function for remove specific book from local storage - It is inactive now
  // const removeBook = (id) => {
  //   setList(list.filter((book) => book.id !== id))
  // }

  // Function for removing specific book from Firestore database.
  const removeSpecificBook = async (id) => {
    await bookData.firebase
      .firestore()
      .collection('books')
      .doc(`${id}`)
      .delete()
    setList(list.filter((book) => book.bookName !== id))
  }
  // // Function for clear all books from local storage - It is inactive now
  // const clearAllBooks = () => {
  //   setList([])
  // }

  // // Render hook - It is working when rendering happens. - [list] means it is only working when list changes.
  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list))
  // }, [list])

  // Render hook - [] means only working on initial state.
  useEffect(() => {
    getBookList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {loading ? (
          <h1 className='text-6xl text-center mt-10 text-white'>Loading...</h1>
        ) : (
          <Booklist items={list} removeSpecificBook={removeSpecificBook} />
        )}
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
                <h3>{item.bookName}</h3>
              </div>
              <div className='p-1'>
                <h5 className='font-semibold'>Writer Name</h5>
                <h3>{item.writerName}</h3>
              </div>
              <div className='p-1'>
                <h5 className='font-semibold'>Total Page</h5>
                <h3>{item.pageNumber}</h3>
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={() => removeSpecificBook(item.bookName)}
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

export default Firebasepc
