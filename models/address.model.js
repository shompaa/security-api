import { Schema, model } from "mongoose";

/**
 * Attributes:
 * street: String
 * number: Number
 * district: String
 * proprietary: User model,
 * createdAt: Date
 * updatedAt: Date
 * deletedAt: Date
 * disabled: Boolean
 * pending: boolean
 * owners: Owner model
 * */

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    proprietary: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Boolean,
      default: true,
    },
    owners: [
      {
        type: Schema.Types.ObjectId,
        ref: "Owner",
      },
    ],
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Address = model("Address", addressSchema);
