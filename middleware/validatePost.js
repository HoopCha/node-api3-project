function validatePost(req, res, next) {
    const posts = req.body;
  
    if (!posts) {
      res.status(400).json({ message: "Missing user data" });
    } else if (!posts.text) {
      res.status(400).json({ message: "Missing required text field" });
    } else {
      next();
    }
  }

module.exports = validatePost;