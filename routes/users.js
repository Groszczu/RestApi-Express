const express = require('express');
const User = require('../models/user');

const router = express.Router();

const getUserById = require('../middleware/getById')(User);

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', getUserById, (req, res) => {
  res.json(res.user);
});

router.post('/', async (req, res) => {
  const newUser = new User(req.body);

  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  const allUserProperties = Object.keys(User.schema.paths);

  // check if all required properties of user are set
  const unsetProperty = allUserProperties.find(
    path => path.charAt(0) !== '_' && !req.body.hasOwnProperty(path));

  if (unsetProperty) {
    return res.status(400).json({ message: `${unsetProperty} must be specified`});
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false});
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.delete('/:id', getUserById, async (req, res) => {
  try {
    await res.user.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;