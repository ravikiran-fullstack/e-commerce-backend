import express from 'express';
import expresAsynHanler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    return res.send({users: data.users});
})

userRouter.get('/seed', expresAsynHanler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    return res.send({createdUsers})
}))


export default userRouter