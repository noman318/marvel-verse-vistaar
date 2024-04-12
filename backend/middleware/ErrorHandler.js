const NotFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404).send(error);
  next(error);
};

const ErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = err.message;
  res.status(statusCode).json({
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { NotFound, ErrorHandler };
