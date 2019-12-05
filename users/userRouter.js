const express = require("express");

const router = express.Router();

const users = require("./userDb");
const posts = require("../posts/postDb");

const validatePost = require("../middleware/validatePost");
const validateUser = require("../middleware/validateUser");
const validateUserId = require("../middleware/validateUserId");

router.use(express.json());

router.post("/", validateUser, (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the user" });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };

  posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error posting this post" });
    });
});

router.get("/", (req, res) => {
  users.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the user" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error getting the posts for this user" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then(user => {
      if (user > 0) {
        res
          .status(200)
          .json({ message: "The user has been deleted successfully" });
      } else {
        res.status(400).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error removing the user" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error updating the user" });
    });
});

//custom middleware


module.exports = router;