import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils.js';

const userRouter = express.Router();

//get all users
userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.send(users)
}))
// signup new user
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    try {
        let { name, mobile, email, password } = req.body;
        let user = await User.findOne({ email });
        if (!name || !mobile || !email || !password) {
            res.status(401).send({ message: 'Please Fill All Fields' });
        }
        if (user) {
            res.status(401).send({ message: 'An Account With This Email is Already Exists!' })
        }
        if (!user) {

            const salt = await bcrypt.genSalt(8);
            password =  bcrypt.hashSync(password, salt)
            const user = new User({
                name,
                email,
                mobile,
                password
            });
            const createdUser = await user.save();
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                mobile: createdUser.mobile,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            });
        }


    } catch (err) {
        res.status(500).send({ message: err.message });
    }

})
);

//signin user
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
           return res.status(401).send({ message: 'Please Fill All Fields' });
        }

        if (!user) {
          return  res.status(401).send({ message: 'No Account With This Email' })
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
          return  res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        } else {
           return res.status(401).send({ message: 'Invalid Email or Password' });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }


}));

userRouter.get('/:id', expressAsyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user)
    } else {
        return res.status(401).send({ message: 'User not Found!' });
    }
}))

export default userRouter;