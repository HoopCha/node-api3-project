function logger(req, res, next) {
    console.log(
      `${req.method} to ${req.originalUrl} at [${new Date().toISOString()}]`
    );
    next();
  }
module.exports = logger;