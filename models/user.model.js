import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
});

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
}

export const User = model("User", userSchema);