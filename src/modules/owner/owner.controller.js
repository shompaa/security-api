import {
  addCarToOwner,
  createOwner,
  deleteOwner,
  findCarsByOwner,
  findOwnerById,
  findOwners,
  updateOwner,
} from "./owner.service.js";

export const getOwners = async (req, res, next) => {
  try {
    const owners = await findOwners();
    res.status(200).json(owners);
  } catch (e) {
    next(e);
  }
};

export const getOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await findOwnerById(id);
    res.status(200).json(owner);
  } catch (e) {
    next(e);
  }
};

export const getCarsByOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cars = await findCarsByOwner(id);
    res.status(200).json(cars);
  } catch (e) {
    next(e);
  }
};

export const addOwner = async (req, res, next) => {
  try {
    const owner = await createOwner(req.body);
    res.status(200).json({
      message: "Owner created successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
  }
};

export const editOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await updateOwner(id, req.body);
    res.status(200).json({
      message: "Owner updated successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
  }
};

export const removeOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await deleteOwner(id);
    res.status(200).json({
      message: "Owner deleted successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
  }
};

export const asociateCar = async (req, res, next) => {
  const { carId, ownerId } = req.body;
  try {
    const asociateCar = await addCarToOwner(ownerId, carId);
    res.status(200).json(asociateCar);
  } catch (e) {
    next(e);
  }
};
