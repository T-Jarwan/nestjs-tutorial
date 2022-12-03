import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        type: Array
    },
    passwordHash: {
        type: String,
        required: true
    }
});