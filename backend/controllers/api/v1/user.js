const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(401, {
        message: "Invalid password",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      if (user) {
        return res.json(200, {
          message: "succesfully sign up",
        });
      }
    }
    return res.json(401, {
      message: "user already exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user || !validPassword) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    // return res.json(200, {
    //   message: "Sign in successful, here is your token, please keep it safe!",
    //   data: {
    //     token: jwt.sign(user.toJSON(), "kuldeep", { expiresIn: "100000" }),
    //   },
    // });
    var options = {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
      sameSite: "strict",
    };
    const token = jwt.sign(user.toJSON(), "kuldeep", { expiresIn: "1000000" });
    res.cookie("jwt", token, options);
    return res.send("succes fully login");
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.userinfo = function (req, res) {
  res.send("Hello kuldeep");
};
