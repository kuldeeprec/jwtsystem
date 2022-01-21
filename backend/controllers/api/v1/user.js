const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.json(422, {
      message: "Invalid password",
    });
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.json(422, {
        message: "uable to find",
      });
    }

    if (!user) {
      // console.log(req.body.name, req.body.email, req.body.password);
      const salt = bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(req.body.password, 10);
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
        function (err, user) {
          if (err) {
            return res.json(422, {
              message: "unable to create",
            });
          }
          return res.json(422, {
            message: "succesfully log in",
          });
        }
      );
    } else {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
  });
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
    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "kuldeep", { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
