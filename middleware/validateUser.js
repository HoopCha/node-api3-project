function validateUser(req, res, next) {
  const newUser = req.body;

  if (!newUser) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!newUser.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

module.exports = validateUser;