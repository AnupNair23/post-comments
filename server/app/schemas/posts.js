import mongoose, { Schema } from 'mongoose'

const PostSchema = mongoose.Schema({
  postDate : {
    type: Date,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postContent: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]
})

const PostModel = mongoose.model('Posts', PostSchema);
export { PostSchema, PostModel }
