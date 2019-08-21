const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  message: {
    type: String,
  },
  description: {
    type: String,
  },
  authorID: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  ideaID: [{
    type: ObjectId,
    ref: 'Idea'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;