const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyJwt, verifyTokenAndAuthorization } = require("./verifyToken");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //   res.send("working");
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
