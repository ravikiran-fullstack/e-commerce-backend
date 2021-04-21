import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';

import {generateToken} from '../utils/utils.js'
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  return res.send({users: data.users});
})

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  //await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  return res.send({createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    // console.log('req,body',req.body);
    const user = await User.findOne({email: req.body.email});

    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        });
        return ;
      }
    }
    res.status(401).send({message: 'Invalid user email or password'});
}))

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
      console.log(req.body);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await newUser.save();

    return res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: false,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
