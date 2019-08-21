'use strict'

const express = require('express')
const Idea = require('../models/Idea')
const router = express.Router()

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');


router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const listOfPosts = await Idea.find()
    console.log(listOfPosts)
    res.status(200).json({ listOfPosts })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const listOfPostsFromUser = await Idea.find()
    console.log(listOfPostsFromUser)
    res.status(200).json({ listOfPostsFromUser })
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const newPost = req.body
    console.log(newPost)
    const createdPost = await Idea.create(newPost)
    res.status(200).json(createdPost)
  } catch (error) {
    next(error)
  }
}
)

router.delete('/:id/delete', async (req, res, next) => {
  const { id } = req.params
  try {
    await Idea.findByIdAndDelete(id)
    res.status(200).json({ message: 'Post deleted succesfully' })
  } catch (error) {
    next(error)
  }
})
/*
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
}) */

module.exports = router