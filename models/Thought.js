const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reactions: [
    {
      emoji: String,
      username: String,
    },
  ],
  // Add other fields as needed for your thought model
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
