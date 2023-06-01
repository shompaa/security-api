import {
  createCar,
  deleteCar,
  findCarById,
  findCarByPlate,
  findCars,
  updateCar,
} from "./car.service.js";

export const getCars = async (req, res, next) => {
  try {
    const cars = await findCars();
    res.status(200).json({ data: cars });
  } catch (e) {
    next(e);
  }
};

export const getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await findCarById(id);
    res.status(200).json({ data: car });
  } catch (e) {
    next(e);
  }
};

export const getCarByPlate = async (req, res, next) => {
  try {
    const { plate } = req.params;
    const { user } = req.body;
    const car = await findCarByPlate(plate, user);
    res.status(200).json({ data: car });
  } catch (e) {
    next(e);
  }
};

export const addCar = async (req, res, next) => {
  try {
    const car = await createCar(req.body);
    res.status(201).json({
      data: car,
    });
  } catch (e) {
    next(e);
  }
};

export const editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await updateCar(id, req.body);
    res.status(200).json({
      data: car,
    });
  } catch (e) {
    next(e);
  }
};

export const removeCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await deleteCar(id);
    res.status(200).json({
      data: car,
    });
  } catch (e) {
    next(e);
  }
};
