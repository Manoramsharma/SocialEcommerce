module.exports = isSeller = (req, res, next) => {
  try {
    if (req.user.isSeller) next();
    else
      res
        .status(401)
        .json({ message: "Unauthorized access. Please contact admin! " });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ message: err.message || "Some error has occurred" });
  }
};
