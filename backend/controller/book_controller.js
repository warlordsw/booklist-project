export const createBook = (req, res) => {
  const book = req.body
  console.log(book)
  res.status(200).json(book)
}
