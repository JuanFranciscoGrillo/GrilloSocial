// Importing required modules
const mongoose = require('mongoose'); // MongoDB library
const moment = require('moment'); // Date and time library

// Defining the User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/] // Email validation regex
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought' // Reference to the Thought model
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the User model
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual property to get the count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Creating the User model
const User = mongoose.model('User', UserSchema);

// Exporting the User model
module.exports = User;