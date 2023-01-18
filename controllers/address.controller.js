import {
  changePendingAddress,
  createAddress,
  deleteAddress,
  findAddressById,
  findCarsByAddress,
  findOwnersByAddress,
  findPendingAddresses,
  updateAddress,
} from "../services/index.service.js";

export const getOwnersByAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owners = await findOwnersByAddress(id);
    res.json({
      status: 200,
      data: owners,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const getCarsByAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cars = await findCarsByAddress(id);
    res.json({
      status: 200,
      data: cars,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await findAddressById(id);
    res.json({
      status: 200,
      data: address,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await createAddress(req.body);
    return res.json({
      status: 200,
      message: "Address created successfully",
      data: address,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const editAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await updateAddress(id, req.body);
    return res.json({
      status: 200,
      message: "Address updated successfully",
      data: address,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const removeAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await deleteAddress(id);
    return res.json({
      status: 200,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const getPendingAddresses = async (req, res, next) => {
  try {
    const pendingAddresses = await findPendingAddresses();
    return res.json({
      status: 200,
      data: pendingAddresses,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const approveAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await changePendingAddress(id, { approved: true });
    return res.json({
      status: 200,
      message: "Address approved successfully",
      data: address,
    });
  } catch (e) {
    next(e);
    return;
  }
};
