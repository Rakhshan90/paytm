const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email().min(15).max(30).toLowerCase().trim(),
    firstName: zod.string().min(2).trim(),
    lastName: zod.string().min(2).trim(),
    password: zod.string().min(6),
});

const signinSchema = zod.object({
    username: zod.string().email().min(15).max(30).toLowerCase().trim(),
    password: zod.string().min(6),
});

const bodySchema = zod.object({
    firstName: zod.string().min(2).trim(),
    lastName: zod.string().min(2).trim(),
    password: zod.string().min(6),
});

router.post('/signup', async (req, res) => {

    const { username, firstName, lastName, password } = req.body;
    const { success } = signupSchema.safeParse({ username, firstName, lastName, password });
    if (!success) return res.status(403).json({ message: "Wrong inputs, Provide valid information" });

    const foundUser = await User.findOne({ username });
    if (foundUser) return res.status(411).json({ message: "Email already taken / Incorrect inputs" });

    const newUser = await User.create({
        username, firstName, lastName, password
    });

    const userId = newUser._id;
    
    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10001),
    });
    
    const token = jwt.sign({ userId }, JWT_SECRET);
    
    res.status(200).json({
        message: "User created successfully",
        token: token,
    });

});

router.post('/signin', async (req, res) => {

    const { username, password } = req.body;

    const { success } = signinSchema.safeParse({ username, password });
    if (!success) return res.status(403).json({ message: "Wrong inputs, Provide valid information" });

    const foundUser = await User.findOne({ username, password });
    if (foundUser) {
        const token = jwt.sign({
            userId: foundUser._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })

});

router.put('/', authMiddleware, async (req, res) => {
    const { success } = bodySchema.safeParse(req.body);
    if (!success) return res.status(411).json({ message: "Error while updating information" });

    try {
        await User.findOneAndUpdate({_id: req.userId}, {
            ...req.body
        }, { new: true, runValidators: true });
        res.status(200).json({message: "Updated successfully "});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/bulk', authMiddleware, async (req, res)=>{
    const {filter} = req.query || "";
    try {
        const users = await User.find({
            $or: [
                {firstName: {$regex: filter}},
                {lastName: {$regex : filter}}
            ]
        }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;