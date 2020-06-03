const express = require('express');
const Post = require('../models/post');

const router = express.Router();

const getPostById = require('../middleware/getById')(Post);

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', getPostById, async (req, res) => {
  res.json(res.post);
});

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const createdPost = await newPost.save();

    res.status(201).json(createdPost);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  const allPostProperties = Object.keys(Post.schema.paths);

  // check if all required properties of post are set
  const unsetProperty = allPostProperties.find(path => path.charAt(0) !== '_' && !req.body.hasOwnProperty(path))
  if (unsetProperty) {
    return res.status(400).json({ message: `${unsetProperty} must be specified`})
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
})

router.delete('/:id', getPostById, async (req, res) => {
  try {
    await res.post.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
