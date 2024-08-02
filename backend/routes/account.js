const express = require('express');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');
const zod = require('zod');

const router = express.Router();

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number(),
});

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const account = await Account.findOne({userId});
        res.status(200).json({balance: account.balance});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/transfer', authMiddleware, async (req, res)=>{

    // create session
    const session = await mongoose.startSession();
    
    // start the transaction
    session.startTransaction();

    const {amount, to} = req?.body;

    const {success} = transferSchema.safeParse({
        to,
        amount
    });
    if(!success){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid input type"
        });
    }

    // find sender account
    const account = await Account.findOne({userId: req?.userId}).session(session);
    if(!account || account?.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    // find receiver account
    const receiverAcc = await Account.findOne({userId: to}).session(session);
    if(!receiverAcc) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // perform the transfer
    await Account.updateOne({userId: req?.userId}, {
        $inc: {balance: -amount}
    }).session(session);


    await Account.updateOne({userId: to}, {
        $inc: {balance: amount}
    }).session(session);

    // commit the transaction
    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successful"
    });

});

module.exports = router;