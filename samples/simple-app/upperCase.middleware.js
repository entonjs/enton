const upperCaseMiddleware = (req, res, next) => {
  const rawReq = req;

  rawReq.name = req.params.name.toUpperCase();

  next();
};

export default upperCaseMiddleware;
