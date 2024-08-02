const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 15,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
});


const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {User, Account};