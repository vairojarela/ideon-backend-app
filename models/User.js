const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://capricornio-habitat.com/wp-content/uploads/2015/07/generic-avatar.png'
  },
  points: {
    type: Number,
  },
  ideas: [{
    type: ObjectId,
    ref: 'Idea'
  }],
  votes: [{
    type: ObjectId,
    ref: 'Idea'
  }],
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  interests: [{
    type: String,
    enum: ['React', 'React', 'Vue']
  }],
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;