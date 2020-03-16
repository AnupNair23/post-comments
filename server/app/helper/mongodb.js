import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
function dbConnect() {
  mongoose.connect('mongodb://frapp123:frapp123@ds033887.mlab.com:33887/frapp')
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })
}
export default dbConnect
