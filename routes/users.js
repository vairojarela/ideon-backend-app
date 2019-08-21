'use strict'

const express = require('express')
const User = require('../models/User')
const router = express.Router()

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');

router.get('/', async (req, res, next) => {
  try {
    const listOfUser = await User.find()
    res.status(200).json({ listOfUser })
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    const newUser = req.body
    const createdUser = await User.create(newUser)
    res.status(200).json(createdUser)
  } catch (error) {
    next(error)
  }
}
)

router.put('/:id/update', async (req, res, next) => {
  const { id } = req.params
  const updatedUser = req.body
  try {
    const updated = await User.findByIdAndUpdate(id, updatedUser, { new: true })
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id/delete', async (req, res, next) => {
  const { id } = req.params
  try {
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'User deleted succesfully' })
  } catch (error) {
    next(error)
  }
})

module.exports = router