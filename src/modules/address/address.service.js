import { Address } from "./address.model.js";
import { createOwner } from "../owner/owner.service.js";
import { findUserById } from "../user/user.service.js";

export const findAddresses = async () => {
  try {
    const addresses = await Address.find()
      .populate("proprietary", "name lastName email rut")
      .populate("owners", "name lastName rut")
      .populate("cars", "patent brand model color year");
    return addresses;
  } catch (error) {
    throw error;
  }
};

export const findOwnersByAddress = async (addressId) => {
  try {
    const address = await Address.findById(addressId)
      .populate("owners", "name lastName rut")
      .populate("cars", "patent brand model color year");
    if (!address) {
      throw new Error("Address not found");
    }
    return address.owners;
  } catch (error) {
    throw error;
  }
};

export const findCarsByAddress = async (addressId) => {
  try {
    const address = await Address.findById(addressId).populate(
      "cars",
      "patent brand model color year"
    );
    if (!address) {
      throw new Error("Address not found");
    }
    return address.cars;
  } catch (error) {
    throw error;
  }
};

export const findAddressById = async (id) => {
  try {
    const address = await Address.findById(id)
      .populate("proprietary", "name lastName email")
      .populate("owners", "name lastName rut")
      .populate("cars", "patent brand model color year");
    if (!address) {
      throw new Error("Address not found");
    }
    return address;
  } catch (error) {
    throw error;
  }
};

export const createAddress = async (address) => {
  try {
    const { user, street, number, district } = address;
    const existentAddress = await Address.findOne({ street, number, district });

    if (existentAddress) {
      throw new Error(`Address already exists`);
    }
    const userDB = await findUserById(user?.id);
    if (!userDB) {
      throw new Error(`User not found`);
    }
    const newOwner = await createOwner({
      rut: userDB.rut,
      lastName: userDB.lastName,
      name: userDB.name,
    });

    const newAddress = new Address({
      ...address,
      proprietary: user?.id,
      owners: [newOwner._id],
    });

    await newAddress.save();

    return newAddress;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (id, address) => {
  try {
    const { _id, ...params } = address;
    const updatedAddress = await Address.findByIdAndUpdate(id, params, {
      new: true,
    });
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const addressDB = await Address.findById(id);
    if (!addressDB) {
      throw new Error(`Address not found`);
    }
    const deletedAddress = await Address.findByIdAndUpdate(
      id,
      { disabled: !addressDB?.disabled },
      { new: true }
    );
    return deletedAddress;
  } catch (error) {
    throw error;
  }
};

export const findPendingAddresses = async () => {
  try {
    // populate with propietary which is of type Model User
    const addresses = await Address.find({ pending: true }).populate(
      "proprietary",
      "name lastName email rut"
    );
    return addresses;
  } catch (error) {
    throw error;
  }
};

export const changePendingAddress = async (idAddress) => {
  try {
    const addressDB = await Address.findById(idAddress);
    if (!addressDB) {
      throw new Error(`Address not found`);
    }
    const updatedAddress = await Address.findByIdAndUpdate(
      idAddress,
      { pending: !addressDB?.pending },
      { new: true }
    );
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};

export const addIntegrantToAddress = async (idAddress, idUser) => {
  try {
    const addressDB = await Address.findById(idAddress);
    if (!addressDB) {
      throw new Error(`Address not found`);
    }
    const userDB = await findUserById(idUser);
    if (!userDB) {
      throw new Error(`User not found`);
    }
    addressDB.owners.push(userDB._id);
    const updatedAddress = await updateAddress(idAddress, addressDB);
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};
