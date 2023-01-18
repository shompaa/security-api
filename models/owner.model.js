import { Schema, model } from "mongoose";

/**
 * Attributes:
 * name: String
 * lastName: String
 * rut: String
 * address: Address model
 * createdAt: Date
 * updatedAt: Date
 * deletedAt: Date
 * disabled: Boolean
 * cars: [Car model]
 */

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
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
});

ownerSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

export const Owner = model("Owner", ownerSchema);
