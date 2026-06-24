export const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details, success: false });
    return;
  }
  res.status(500).json({ message: err.message });
};
