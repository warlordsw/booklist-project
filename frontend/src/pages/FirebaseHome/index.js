import React, { useState, useEffect, useContext } from 'react'
import BookList from '../../components/BookList'
import CreateBook from '../../components/CreateBook'
import FirebaseContext from '../../context/firebase'

const FireBaseHome = () => {
  //useContext hook
  const bookData = useContext(FirebaseContext)

  //state hooks
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState('')
  const [image, setImage] = useState('')
  const [bookProperties, setBookProperties] = useState({
    bookName: '',
    writerName: '',
    pageNumber: '',
  })
  let id
  let uploadResult
  // Function for get all document data from Firestore database and map it.
  const getBookList = async () => {
    const snapshot = await bookData.firebase
      .firestore()
      .collection('books')
      .get()
    const result = await snapshot.docs.map((item) => item.data())
    setLoading(false)
    setList(result)
  }

  // Function for delete all books from Firestore database documents.
  const removeAllBooks = async () => {
    const db = await bookData.firebase.firestore()
    const getId = await db.collection('books').get()
    const result = await getId.docs.map((item) => item.id)
    for (let i = 0; i < result.length; i++) {
      await db.collection('books').doc(`${result[i]}`).delete()
    }
    await getBookList()
  }

  //Function for send data to Firestore when onSubmit. It is working in handleSubmit method
  async function sendDatabase(firebase) {
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
      uploadResult = result.secure_url
      await firebase.firestore().collection('books').doc(id).set({
        id: id,
        bookName: bookProperties.bookName,
        writerName: bookProperties.writerName,
        pageNumber: bookProperties.pageNumber,
        uploadUrl: uploadResult,
      })
    } catch (error) {
      console.log(error)
    }
  }

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
        id = new Date().getTime().toString()
        await sendDatabase(bookData.firebase)
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
        //await getBookList()
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Function for removing specific book from Firestore database.
  const removeSpecificBook = async (id) => {
    await bookData.firebase
      .firestore()
      .collection('books')
      .doc(`${id}`)
      .delete()
    setList(list.filter((book) => book.id !== id))
  }

  // Render hook - [] means only working on initial state.
  useEffect(() => {
    getBookList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <CreateBook
        handleSubmit={handleSubmit}
        info={info}
        bookProperties={bookProperties}
        setBookProperties={setBookProperties}
        setImage={setImage}
      />
      {loading ? (
        <h1 className='text-6xl text-center mt-10 text-white'>Loading...</h1>
      ) : (
        <BookList
          items={list}
          removeSpecificBook={removeSpecificBook}
          removeAllBooks={removeAllBooks}
        />
      )}
    </div>
  )
}

export default FireBaseHome
