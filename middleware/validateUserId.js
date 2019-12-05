const users = require("../users/userDb");

function validateUserId(req, res, next) {
    const { id } = req.params;
  
    users.getById(id)
      .then(userId => {
        if (userId) {
          userId = req.user;
          next();
        } else {
          res.status(400).json({ errorMessage: "Invalid user id." });
        }
      })
      .catch(error => {
        console.log(
          res
            .status(500)
            .json({ error: "There was an error validating the user id" })
        );
      });
  }

module.exports = validateUserId;