import mongoose, { Schema } from 'mongoose'

const CommentSchema = mongoose.Schema({
  commentDate: {
    type: Date,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentContent: {
    type: String,
    required: true
  },
  showComment: {
    type: Boolean,
    default: true
  },
  postId: {
    type: String,
    required: true
  }
})

const CommentModel = mongoose.model('Comments', CommentSchema);
export { CommentSchema, CommentModel }
