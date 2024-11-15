import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
}, { collection: 'users' });


const User = mongoose.model('User', userSchema);

export default User;