import { Address } from "../models/index.model.js";
import { createOwner, editUser, findUserById, updateOwner } from "./index.service.js";

// export const findOwnersByAddress = async (addressId) => {
//   try {
//     const owners = await Address.findById(addressId);
//     return owners;
//   } catch (error) {
//     throw error;
//   }
// };

// export const findCarsByAddress = async (addressId) => {
//   try {
//     const cars = await Address.findById(addressId).populate("cars");
//     return cars;
//   } catch (error) {
//     throw error;
//   }
// };

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
    const userDB = await findUserById(user?.id);
    const existentAddress = await Address.findOne({ street, number, district });
    if (existentAddress) {
      throw new Error(`Address already exists`);
    }

    const owner = await createOwner(userDB);
    const newAddress = new Address({
      ...address,
      proprietary: userDB?.id,
      owners: [owner],
    });
    await newAddress.save();
    await editUser(userDB.id, { ...userDB._doc, address: newAddress.id });
    await updateOwner(owner.id, { ...owner._doc, address: newAddress.id });
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
    const owner = await createOwner(userDB);
    addressDB.owners.push(owner);
    const updatedAddress = await updateAddress(idAddress, addressDB);
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};
