import React from 'react'

const CreateBook = ({
  handleSubmit,
  info,
  setImage,
  setBookProperties,
  bookProperties,
  loading,
  isUploaded,
  uploadInfo,
}) => {
  return (
    <div>
      <div>
        <nav className='bg-blue-500  text-center text-white px-6 py-3'>
          Create Book
        </nav>
      </div>
      <div className='bg-red-200 mx-auto w-96 rounded-lg justify-center mt-20 '>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='p-3 mx-8 text-center'>
              <label htmlFor='book-name'>Enter Book Name</label>
              <input
                disabled={loading}
                id='book-name'
                name='bookName'
                value={bookProperties.bookName}
                onChange={(e) =>
                  setBookProperties({
                    ...bookProperties,
                    [e.target.name]: e.target.value,
                  })
                }
                className='rounded-md'
                type='text'
                placeholder='Book Name'
              />
            </div>
            <div className='p-3 mx-8 text-center'>
              <label htmlFor='writer-name'>Enter Writer Name</label>
              <input
                disabled={loading}
                id='writer-name'
                name='writerName'
                value={bookProperties.writerName}
                onChange={(e) =>
                  setBookProperties({
                    ...bookProperties,
                    [e.target.name]: e.target.value,
                  })
                }
                className='rounded-md'
                type='text'
                placeholder='Writer Name'
              />
            </div>
            <div className='p-3 mx-8 text-center'>
              <label htmlFor='page-number'>Enter Total Page Number</label>
              <input
                disabled={loading}
                id='page-number'
                name='pageNumber'
                value={bookProperties.pageNumber}
                onChange={(e) =>
                  setBookProperties({
                    ...bookProperties,
                    [e.target.name]: e.target.value,
                  })
                }
                className='rounded-md'
                type='number'
                placeholder='Page Number'
              />
            </div>
            <div className='p-3 mx-8 text-center'>
              <div>
                <label htmlFor='upload-image'>Upload Image</label>
              </div>
              <div className='p-3'>
                {isUploaded && (
                  <input
                    accept='.jpg, .png, .jpeg'
                    disabled={loading}
                    id='upload-image'
                    type='file'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                )}
              </div>
            </div>
            <div className='flex justify-center p-3'>
              <button
                disabled={loading}
                className='bg-blue-500 py-3 px-6 rounded-full text-white'
              >
                Submit
              </button>
            </div>
            <div className='p-3 text-center  text-white'>
              {uploadInfo.uploading ? (
                <h3>{uploadInfo.info}</h3>
              ) : (
                <h3>{info}</h3>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBook
