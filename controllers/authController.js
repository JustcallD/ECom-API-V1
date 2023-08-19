const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

//REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const inputPassword = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(inputPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { password, ...others } = user._doc;

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", ...others, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };

//REGISTER

//LOGIN

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       userName: req.body.user_name,
//     });

//     !user && res.status(401).json("Wrong User Name");

//     const hashedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.PASS_SEC
//     );

//     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//     const inputPassword = req.body.password;

//     originalPassword != inputPassword && res.status(401).json("Wrong Password");

//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.JWT_SEC,
//       { expiresIn: "3d" }
//     );

//     const { password, ...others } = user._doc;
//     res.status(200).json({ ...others, accessToken });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
