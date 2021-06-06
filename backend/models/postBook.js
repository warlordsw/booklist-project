import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  bookName: { type: String },
  writerName: { type: String },
  pageNumber: { type: Number },
})

const PostBook = mongoose.model('CreatedBook', postSchema)

export default PostBook
