import { Owner } from "../models/index.model.js";
import { findAddressById } from "./address.service.js";
import { findCarById } from "./car.service.js";

export const findOwners = async () => {
  try {
    const owners = await Owner.find()
      .populate("cars", "patent brand model color year")
      .populate("address", "street number city");
    return owners;
  } catch (error) {
    throw error;
  }
};

export const findCarsByOwner = async (ownerId) => {
  try {
    const owner = await Owner.findById(ownerId).populate({
      path: "cars",
      populate: [{ path: "address" }, { path: "owner" }],
    });
    return owner?.cars || [];
  } catch (error) {
    throw error;
  }
};
export const findOwnerById = async (id) => {
  try {
    const owner = await Owner.findById(id).populate("cars");
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw error;
  }
};

export const createOwner = async (owner) => {
  try {
    const { rut, name, lastName, address } = owner;
    const existentOwner = await Owner.findOne({ rut });
    if (existentOwner) {
      throw new Error(`Owner with ${rut} already exists`);
    }

    const newOwner = new Owner({ rut, name, lastName, address });
    await newOwner.save();

    // Fetch the address and update it with the new owner
    const addressRecord = await findAddressById(address);
    if (addressRecord) {
      addressRecord.owners.push(newOwner._id);
      await addressRecord.save();
    }

    return newOwner;
  } catch (error) {
    throw error;
  }
};

export const updateOwner = async (id, owner) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(id, owner, {
      new: true,
    });
    return updatedOwner;
  } catch (error) {
    throw error;
  }
};

export const deleteOwner = async (id) => {
  try {
    const ownerDB = await Owner.findById(id);
    if (!ownerDB) {
      throw new Error(`Owner not found`);
    }
    const deletedOwner = await Owner.findByIdAndUpdate(
      id,
      { disabled: !ownerDB?.disabled },
      { new: true }
    );
    return deletedOwner;
  } catch (error) {
    throw error;
  }
};

export const addCarToOwner = async (ownerId, carId) => {
  console.log(ownerId, carId);
  try {
    const owner = await findOwnerById(ownerId);
    if (!owner) {
      throw new Error("Owner not found");
    }
    const car = await findCarById(carId);
    if (!car) {
      throw new Error("Car not found");
    }
    owner.cars.push(carId);
    await owner.save();
    return "ok";
  } catch (error) {
    throw error;
  }
};
