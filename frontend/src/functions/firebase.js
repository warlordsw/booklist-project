// Function for get all document data from Firestore database and map it.
export const getBookList = (setLoading, setList, bookData) => {
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
export const removeAllBooks = async (bookData, setLoading, setList) => {
  const db = await bookData.firebase.firestore()
  const getId = await db.collection('books').get()
  const result = await getId.docs.map((item) => item.id)
  for (let i = 0; i < result.length; i++) {
    await db.collection('books').doc(`${result[i]}`).delete()
  }
  return await getBookList(setLoading, setList, bookData)
}

//Function for send data to Firestore when onSubmit. It is working in handleSubmit method
export async function sendDatabase(firebase, bookName, writerName, pageNumber) {
  await firebase.firestore().collection('books').doc(bookName).set({
    id: new Date().getTime().toString(),
    bookName: bookName,
    writerName: writerName,
    pageNumber: pageNumber,
  })
}

// Function for removing specific book from Firestore database.
export const removeSpecificBook = async (id, bookData, setList, list) => {
  await bookData.firebase.firestore().collection('books').doc(`${id}`).delete()
  setList(list.filter((book) => book.bookName !== id))
}
