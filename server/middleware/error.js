exports.get404 = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    // next(error);
    res.json({
        message: "404 - Page not found."
    })
    next();
  };