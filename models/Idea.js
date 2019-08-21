const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ideaSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  votes: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: 'https://media.istockphoto.com/photos/two-attractive-business-woman-teamwork-working-on-table-with-strategy-picture-id930552228?k=6&m=930552228&s=612x612&w=0&h=Hxo3yfDPSuP9MEaNWgS-dCukJ1jnVpx8DNynjFrBAZY='
  },
  dreamType:{
    type: String
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;