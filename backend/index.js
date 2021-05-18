import express from 'express'
import bookRoutes from './routes/book.js'
const app = express()

app.get('/books', bookRoutes)

app.listen(5000, () => {
  console.log('Listening port on 5000...')
})
