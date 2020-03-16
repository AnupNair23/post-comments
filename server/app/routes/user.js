import { sendSuccessResponse, sendErrorResponse } from '../helper/common'
import { UserModel } from '../schemas/user'
import bcrypt from 'bcryptjs'
import { getToken } from '../helper/jwt'
import { PostModel } from '../schemas/posts'

const userSignUp = async (req, res) => {
  try {
    let userFound = await UserModel.findOne({ emailId: req.body.emailId }).exec();
    if (userFound)
      res.status(400).send({ "message": "EmailId already registered" })
    else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      let user = new UserModel(req.body);
      user.save((err, data) => {
        if (err) {
          sendErrorResponse(res, err)
        }
        else {
          sendSuccessResponse(res, data)
        }
      })
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

const userLogin = async (req, res) => {
  try {
    let user = await UserModel.findOne({ emailId: req.body.emailId }).exec();
    console.log('user -- ', user)
    if (!user) {
      return res.status(400).send({ message: "The emailId does not exist" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }
    const token = getToken(user);
    // res.send({ message: "The emailId and password combination is correct!" });
    sendSuccessResponse(res, { user: user, token: token })
  } catch (error) {
    res.status(500).send(error);
  }
}

const showPosts = async (req, res) => {
  try {
    PostModel.find()
    .populate({
      path: 'comments',
      populate: [{ path: 'userId', select: 'userName' }]
    })
    .populate('userId').exec((err, data) => {
      if (err)
        sendErrorResponse(res, err)
      else
        sendSuccessResponse(res, data)
    })
  }
  catch (error) {
    res.status(500).send(error)
  }
}

export {
  userLogin,
  userSignUp,
  showPosts
}
