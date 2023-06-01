import { Schema, model } from "mongoose";

/**
 * Attributes:
 * plate: String
 * brand: String
 * model: String
 * color: String
 * year?: Number
 * address: Address model
 * createdAt: Date
 * updatedAt: Date
 * deletedAt: Date
 * disabled: Boolean
 * owner?: Owner model
 */

const carSchema = new Schema(
  {
    plate: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      required: false,
    },
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

export const Car = model("Car", carSchema);
