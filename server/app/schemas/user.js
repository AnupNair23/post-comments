import mongoose, { Schema } from 'mongoose'

const UserSchema = mongoose.Schema({
    userName: {
      type: String
    },
    emailId: {
      type: String
    },
    password: {
      type: String
    },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Posts'
    }]
})

const UserModel = mongoose.model('User', UserSchema);
export { UserSchema, UserModel}
