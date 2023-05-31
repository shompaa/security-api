import createError from "http-errors";

export const errorHandler = (err, _req, res, _next) => {
  const error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    error.message = "Invalid ID";
    error.status = 400;
  }
  if (err.code === 11000) {
    error.message = Object.keys(err.keyValue).map(
      (key) => `${key} already exists`
    );
    error.status = 400;
  }
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors).map((val) => val.message);
    error.status = 400;
  }

  if (err instanceof createError.HttpError) {
    error.status = err.status;
    error.message = err.message;
  }

  return res.status(error?.status || 500).json({
    message: error?.message,
  });
};
