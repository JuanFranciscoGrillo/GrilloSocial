const { User, Thought } = require('../models');

const thoughtController = {
  // /api/thoughts

  // get all thoughts
  async getAllThought(req, res) {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  // get one thoughts by id
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.id })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },

  async createThought({ body }, res) {
    try {
      const { _id } = await Thought.create(body);
      const dbThoughtData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // update Thought by id
  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // delete thought by ID
  async deleteThought({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!' });
        return;
      }
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  async createReaction({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v');
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts with this ID.' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteReaction({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Nope!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  }
};

module.exports = thoughtController;