import createError from "http-errors";
import { Car } from "./car.model.js";
import { findAddressById } from "../address/address.service.js";

export const findCars = async () => {
  try {
    const cars = await Car.find()
      .populate("owner", "name lastName")
      .populate("address", "street number city");
    return cars;
  } catch (error) {
    throw error;
  }
};

export const findCarById = async (id) => {
  try {
    const car = await Car.findById(id).populate("owner", "name lastName");
    if (!car) {
      throw createError(404, "Car not found");
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const findCarByPatent = async (patent) => {
  try {
    const car = await Car.findOne({ patent })
      .populate("owner", "name lastName")
      .populate("address", "street number city");
    if (!car) {
      throw createError(404, "Car not found");
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const createCar = async (car) => {
  try {
    const { patent, address } = car;
    const existentCar = await Car.findOne({ patent });

    if (existentCar) {
      throw createError(409, `Car ${patent} already exists`);
    }

    const newCar = new Car({
      ...car,
      address: address,
    });

    await newCar.save();

    const addressDoc = await findAddressById(address);
    if (!addressDoc) {
      throw createError(404, `Address not found`);
    }

    addressDoc.cars.push(newCar);
    await addressDoc.save();

    return newCar;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (id, car) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, car, { new: true });
    if (!updatedCar) {
      throw createError(404, "Car not found");
    }
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const carDB = await Car.findById(id);

    if (!carDB) {
      throw new createError(404, "Car not found");
    }

    const deletedCar = await Car.findByIdAndUpdate(
      id,
      { disabled: !carDB?.disabled },
      { new: true }
    );
    return deletedCar;
  } catch (error) {
    throw error;
  }
};
