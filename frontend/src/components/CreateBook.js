import React from 'react'

const CreateBook = ({
  bookName,
  writerName,
  pageNumber,
  handleSubmit,
  info,
  setBookName,
  setWriterName,
  setPageNumber,
}) => {
  return (
    <div>
      <div>
        <nav className='bg-blue-500  text-center text-white px-6 py-3'>
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
    </div>
  )
}

export default CreateBook
