import { Schema, model } from "mongoose";

/**
 * Attributes:
 * street: String
 * number: Number
 * district: String
 * owners: [Owner model]
 * proprietary: User model,
 * createdAt: Date
 * updatedAt: Date
 * deletedAt: Date
 * disabled: Boolean
 * cars: [Car model]
 * pending: boolean
 *  */

const addressSchema = new Schema({
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
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  owners: [
    {
      type: Schema.Types.ObjectId,
      ref: "Owner",
    },
  ],
  pending: {
    type: Boolean,
    default: true,
  },
});

addressSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
};

export const Address = model("Address", addressSchema);
