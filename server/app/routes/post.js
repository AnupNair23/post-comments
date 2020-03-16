import { sendSuccessResponse, sendErrorResponse } from '../helper/common'
import { UserModel } from '../schemas/user'
import { PostModel } from '../schemas/posts'

const writePost = async (req, res) => {
  try {
    const body = {
      postContent: req.body.postContent,
      userId: req.body.userId,
      postDate: new Date()
    }
    let newPost = new PostModel(body)
    newPost.save(async (err, data) => {
      if (err)
        sendErrorResponse(res, err)
      else {
        let user = await UserModel.findById(req.body.userId)
        user.posts.push(data._id)
        user.save();
        sendSuccessResponse(res, data);
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
}

const editPost = async (req, res) => {
  try {
    PostModel.findOneAndUpdate({ _id: req.body.postId, userId: req.body.userId }, { postContent: req.body.postContent }, (err, data) => {
      if (err)
        sendErrorResponse(res, err)
      else {
        if (data === null) {
          res.status(400).send({ message: "No post found" });
        }
        else
          sendSuccessResponse(res, req.body)
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
}

const deletePost = async (req, res) => {
  try {
    PostModel.findOneAndRemove({ _id: req.body.postId, userId: req.body.userId }, (err, response) => {
      if (err) {
        sendErrorResponse(res, err)
      }
      else {
        if (response === null) {
          res.status(400).send({ message: "No post found" });
        }
        else {
          UserModel.update(
            { "_id": req.body.userId },
            { "$pull": { "posts": req.body.postId } },
            (err, data) => {
              if (err) {
                sendErrorResponse(res, err)
              }
              else
                sendSuccessResponse(res, data)
            }
          );
        }
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
}

export { writePost, editPost, deletePost }
