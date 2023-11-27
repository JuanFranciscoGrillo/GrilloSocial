// Import the User and Thought models from the '../models' file
const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUser: async (req, res) => {
    try {
      // Find all users in the database and sort them in descending order by _id
      const dbUserData = await User.find({}).select('-__v').sort({ _id: -1 });
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // Get a user by their id
  getUserById: async ({ params }, res) => {
    try {
      // Find a user by their id and populate their thoughts and friends
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
        });
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // Create a new user
  createUser: async ({ body }, res) => {
    try {
      // Create a new user with the provided data
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // Update a user by their id
  updateUser: async ({ params, body }, res) => {
    try {
      // Find a user by their id and update their data
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // Delete a user and their associated thoughts
  deleteUser: async ({ params }, res) => {
    try {
      // Delete all thoughts associated with the user
      await Thought.deleteMany({ userId: params.id });
      // Delete the user
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // Add a friend to a user
  addFriend: async ({ params }, res) => {
    try {
      // Find a user by their id and add the friend to their friends list
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a friend from a user
  deleteFriend: async ({ params }, res) => {
    try {
      // Find a user by their id and remove the friend from their friends list
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;