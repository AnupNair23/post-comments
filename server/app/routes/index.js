import express from 'express'
import { validateUser} from '../middleware/jwt'
const router = express.Router()
import { userLogin, userSignUp, showPosts } from './user'
import { writePost, editPost, deletePost } from './post'
import { writeComment, editComment, hideComment, showComment} from './comment'

// ROUTES for user
router.get('/showPosts', showPosts)
router.post('/user/register', userSignUp)
router.post('/user/login', userLogin)
router.post('/post/write', validateUser, writePost)
router.post('/post/edit', validateUser, editPost)
router.post('/post/delete', validateUser, deletePost)
router.post('/comment/write', validateUser, writeComment)
router.post('/comment/edit', validateUser, editComment)
router.post('/comment/hide', validateUser, hideComment)
router.post('/comment/show', validateUser, showComment)

export default router
