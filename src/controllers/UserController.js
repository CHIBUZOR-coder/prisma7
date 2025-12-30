
const prisma = require('../lib/prisma')

exports.registerUser = async (req, res) => {
  console.log('req.body:', req.body)

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Request body is missing'
    })
  }

  const { name, email } = req.body

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exist' })
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email
      }
    })

    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Unable to create user' })
    }

    return res.status(201).json({
      success: true,
      data: newUser
    })
  } catch (error) {
    console.log(error.message)

    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
