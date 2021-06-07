import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)

  try {
    const existingUser = await User.findOne({ email })
    console.log(existingUser, 'login')

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: 10 }
    )

    res.status(200).json({ result: existingUser, token })
    console.log('User Bulundu')
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', err: error })
  }
}

export const register = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body
  console.log(userName)

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist.' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password dont match' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    console.log(hashedPassword)

    const result = await User.create({
      email,
      password: hashedPassword,
      userName,
    })

    console.log(result)

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: 10,
    })

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', err: error })
  }
}
