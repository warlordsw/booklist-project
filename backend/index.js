import express from 'express'
import bookRoutes from './routes/book.js'
import userRoutes from './routes/user.js'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(
  cors({
    origin: 'https://booklist-project-21.netlify.app',
    credentials: true,
  })
)

app.use(express.json({ extended: false }))

app.use('/books', bookRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL =
  'mongodb+srv://caner:caner123456@cluster0.xbuk5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)
