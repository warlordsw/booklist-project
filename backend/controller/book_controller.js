import fs from 'fs'

export const createBook = (req, res) => {
  const book = req.body
  let data = JSON.stringify(book)
  fs.writeFile('../saveBooks.json', data, (err) => {
    if (err) throw err
    console.log(`data saved`)
  })
}

export const getAllBooks = (req, res) => {
  fs.readFile('../saveBooks.json', (err, data) => {
    if (err) throw err
    let allBooks = JSON.parse(data)
    res.status(200).json(allBooks)
    console.log('read')
  })
}

export const removeSpecificBook = (req, res) => {
  const book = req.body
  console.log(book)
  let data = JSON.stringify(book)
  fs.writeFile('../saveBooks.json', data, (err) => {
    if (err) throw err
    console.log(`data removed`)
  })
}

export const removeAll = (req, res) => {
  const book = req.body
  let data = JSON.stringify(book)
  fs.writeFile('../saveBooks.json', data, (err) => {
    if (err) throw err
    console.log(`all data removed`)
  })
}
