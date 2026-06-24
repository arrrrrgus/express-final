export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: `The request url : ${req.method} ${req.path} not found on this server`,
    },
  });
};
