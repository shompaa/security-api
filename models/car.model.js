import { Schema, model } from "mongoose";

/**
 * Attributes:
 * patent: String
 * brand: String
 * model: String
 * color: String
 * year?: Number
 * owner: Owner model
 * address: Address model
 * createdAt: Date
 * updatedAt: Date
 * deletedAt: Date
 * disabled: Boolean
 */

const carSchema = new Schema({
  patent: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
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
});

carSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

export const Car = model("Car", carSchema);
