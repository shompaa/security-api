import {
  createCar,
  deleteCar,
  findCarById,
  findCarByPatent,
  updateCar,
} from "../services/index.service.js";

export const getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await findCarById(id);
    res.json({
      status: 200,
      data: car,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const getCarByPatent = async (req, res, next) => {
  try {
    const { patent } = req.params;
    const { user } = req.body;
    const car = await findCarByPatent(patent, user);
    res.json({
      status: 200,
      data: car,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const addCar = async (req, res, next) => {
  try {
    const car = await createCar(req.body);
    return res.json({
      status: 200,
      message: "Car created successfully",
      data: car,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await updateCar(id, req.body);
    return res.json({
      status: 200,
      message: "Car updated successfully",
      data: car,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const removeCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await deleteCar(id);
    return res.json({
      status: 200,
      message: "Car deleted successfully",
      data: car,
    });
  } catch (e) {
    next(e);
    return;
  }
};
