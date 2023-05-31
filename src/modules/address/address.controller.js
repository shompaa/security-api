import {
  changePendingAddress,
  createAddress,
  deleteAddress,
  findAddressById,
  findAddresses,
  findCarsByAddress,
  findOwnersByAddress,
  findPendingAddresses,
  updateAddress,
} from "./address.service.js";

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await findAddresses();
    res.status(200).json(addresses);
  } catch (e) {
    next(e);
  }
};

export const getOwnersByAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owners = await findOwnersByAddress(id);
    res.status(200).json(owners);
  } catch (e) {
    next(e);
  }
};

export const getCarsByAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cars = await findCarsByAddress(id);
    res.status(200).json(cars);
  } catch (e) {
    next(e);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await findAddressById(id);
    res.status(200).json(address);
  } catch (e) {
    next(e);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await createAddress(req.body);
    res.status(201).json({
      message: "Address created successfully",
      data: address,
    });
  } catch (e) {
    next(e);
  }
};

export const editAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await updateAddress(id, req.body);
    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });
  } catch (e) {
    next(e);
  }
};

export const removeAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await deleteAddress(id);
    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });
  } catch (e) {
    next(e);
  }
};

export const getPendingAddresses = async (req, res, next) => {
  try {
    const pendingAddresses = await findPendingAddresses();
    res.status(200).json(pendingAddresses);
  } catch (e) {
    next(e);
  }
};

export const approveAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await changePendingAddress(id, { approved: true });
    res.status(200).json({
      message: "Address approved successfully",
      data: address,
    });
  } catch (e) {
    next(e);
  }
};
