import React from 'react'

const BookList = ({ items, removeSpecificBook, removeAllBooks }) => {
  return (
    <div className='container mx-auto'>
      <div className='mt-20 flex flex-wrap items-center justify-center'>
        {items.map((item) => {
          return (
            <div key={item.id} className='p-2 m-2 bg-yellow-100 w-1/4'>
              <div className='p-1 m-1 flex justify-center'>
                <img
                  className='object-contain h-52 w-52'
                  src={item.uploadUrl}
                  alt='some img'
                />
              </div>
              <div className='p-1 m-1'>
                <h5 className='font-semibold'>Book Name</h5>
                <h3>{item.bookName}</h3>
              </div>
              <div className='p-1 m-1'>
                <h5 className='font-semibold'>Writer Name</h5>
                <h3>{item.writerName}</h3>
              </div>
              <div className='p-1 m-1'>
                <h5 className='font-semibold'>Total Page</h5>
                <h3>{item.pageNumber}</h3>
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
      {items.length > 1 && (
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

export default BookList
