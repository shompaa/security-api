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
  return res.status(500).json({
    status: error?.status || 500,
    message: error?.message,
  });
};
