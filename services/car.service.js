import { Car } from "../models/index.model.js";
import { findAddressById, updateAddress } from "./address.service.js";
import createError from "http-errors";

export const findCarById = async (id) => {
  try {
    const car = await Car.findById(id)
      .populate("owner", "name lastName")
      .populate("address", "street number district");
    if (!car) {
      throw new createError(404, "Car not found");
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const findCarByPatent = async (patent, user) => {
  try {
    const car = await Car.findOne({
      patent,
    })
      .populate("owner", "name lastName")
      .populate("address", "street number district");

    if (!car) {
      throw new createError(404, "Car not found");
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const findCarsByAddress = async (addressId) => {
  try {
    const cars = await Car.find({ address: addressId });
    return cars;
  } catch (error) {
    throw error;
  }
};

export const createCar = async (car) => {
  try {
    const { patent, address, user } = car;
    const existentCar = await Car.findOne({ patent });

    if (existentCar) {
      throw new createError(409, `Car ${patent} already exists`);
    }

    const newCar = new Car({
      ...car,
      address,
    });
    await newCar.save();
    const addressDB = await findAddressById(address);
    await updateAddress(address, {
      ...addressDB._doc,
      cars: [...addressDB.cars, newCar._id],
    });

    return newCar;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (id, car) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, car, { new: true });
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
