import { sendSuccessResponse, sendErrorResponse } from '../helper/common'
import { UserModel } from '../schemas/user'
import { PostModel } from '../schemas/posts'
import { CommentModel } from '../schemas/comments'

const writeComment = async (req, res) => {
  try {
    const body = {
      commentContent: req.body.commentContent,
      userId: req.body.userId,
      postId: req.body.postId,
      commentDate: new Date()
    }
    let newComment = new CommentModel(body)
    newComment.save(async (err, data) => {
      if (err)
        sendErrorResponse(res, err)
      else {
        let post = await PostModel.findById(req.body.postId)
        post.comments.push(data._id)
        post.save();
        sendSuccessResponse(res, data);
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
}

const editComment = async (req, res) => {
  try {
    CommentModel.findOneAndUpdate({ _id: req.body.commentId, userId: req.body.userId }, { commentContent: req.body.commentContent }, (err, data) => {
      if (err)
        sendErrorResponse(res, err)
      else {
        if (data === null) {
          res.status(400).send({ message: "Sorry you can't edit the comment" })
        }
        else
          sendSuccessResponse(res, req.body)
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
}

const hideComment = async (req, res) => {
  try {
    PostModel.update(
      { "_id": req.body.postId, "userId": req.body.userId },
      { "$pull": { "comments": req.body.commentId } },
      (err, data) => {
        if (err)
          sendErrorResponse(res, err)
        else {
          if (data === null)
            res.status(400).send({ message: "Sorry you are not permitted to do this" })
          else
            sendSuccessResponse(res, data)
        }
      }
    )
  } catch (error) {
    res.status(500).send(error);
  }
}

const showComment = async (req, res) => {
  try {
    PostModel.update(
      { "_id": req.body.postId, "userId": req.body.userId },
      { "$push": { "comments": req.body.commentId } },
      (err, data) => {
        if (err)
          sendErrorResponse(res, err)
        else {
          if (data === null)
            res.status(400).send({ message: "Sorry you are not permitted to do this" })
          else
            sendSuccessResponse(res, data)
        }
      }
    )
  } catch (error) {
    res.status(500).send(error);
  }
}

export { writeComment, editComment, hideComment, showComment }
