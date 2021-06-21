import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

//get all users
userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.send(users)
}))
// signup new user
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!req.body.name || !req.body.mobile || !req.body.email || !req.body.password) {
            res.status(401).send({ message: 'All Fields Required!' })
        }

        if (user) {
            res.status(401).send({ message: 'An Account Already Exists With This Email!' })
        }

        const newUser = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)

        })

        const createdUser = await newUser.save()
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            mobile: createdUser.mobile,
            email: createdUser.email,
            mobile: createdUser.mobile,
            token: generateToken(createdUser),
        })
    } catch (error) {
        res.status(401).send({ message: error.message })
    }


}));

//signin user
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
            return res.status(401).send({ message: 'Please Fill All Fields' });
        }

        if (!user) {
            return res.status(401).send({ message: 'No Account With This Email' })
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                mobile: user.mobile,
                token: generateToken(user),
            });
        } else {
            return res.status(401).send({ message: 'Invalid Email or Password' });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }


}));

// get user data
userRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user)
    } else {
        return res.status(401).send({ message: 'User not Found!' });
    }
}))

export default userRouter;