const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    image: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'active'
    }
});

module.exports = mongoose.model('User', userSchema);