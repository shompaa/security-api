import { Owner } from "../models/index.model.js";

export const findCarsByOwner = async (ownerId) => {
    try {
        const cars = await Owner.findById(ownerId).populate("cars");
        return cars;
    } catch (error) {
        throw error;
    }
};

export const findOwnersByAddress = async (addressId) => {
    try {
        const owner = await Owner.find({ address: addressId });
        return owner;
    } catch (error) {
        throw error;
    }
}

export const findOwnerById = async (id) => {
    try {
        const owner = await Owner.findById(id);
        if (!owner) {
            throw new Error("Owner not found");
        }
        return owner;
    } catch (error) {
        throw error;
    }
}

export const findOwnerByRut = async (rut) => {
    try {
        const owner = await Owner.findOne({ rut });
        if (!owner) {
            throw new Error("Owner not found");
        }
        return owner;
    } catch (error) {
        throw error;
    }
}

export const createOwner = async (owner) => {
    try {
        const { rut, name, lastName, address } = owner;
        const existentOwner = await Owner.findOne({ rut });
        if (existentOwner) {
            throw new Error(`Owner with ${rut} already exists`);
        }
        const newOwner = new Owner({ rut, name, lastName, address });
        await newOwner.save();
        return newOwner;
    } catch (error) {
        throw error;
    }
}

export const updateOwner = async (id, owner) => {
    try {
        const updatedOwner = await Owner.findByIdAndUpdate(id, owner, { new: true });
        return updatedOwner;
    } catch (error) {
        throw error;
    }
}

export const deleteOwner = async (id) => {
    try {
        const ownerDB = await Owner.findById(id);
        if (!ownerDB) {
            throw new Error(`Owner not found`);
        }
        const deletedOwner = await Owner.findByIdAndUpdate(id, { disabled: !ownerDB?.disabled }, { new: true })
        return deletedOwner;
    } catch (error) {
        throw error;
    }
}
