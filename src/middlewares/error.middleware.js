export const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }
  res.status(500).json({
    success: false,
    error: {
      code: err.statusCode,
      message: err.message,
    },
  });
};
