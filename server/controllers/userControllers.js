const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
exports.createNewUser = async (req, res, next) => {
  try {
    let { username, email, major } = req.body;
    let [takenUsername, _] = await User.findByUsername(username.toLowerCase());
    let [takenEmail, __] = await User.findByEmail(email.toLowerCase());

    if (takenUsername.length > 0) {
      res.status(200).json({ message: "Username has already been taken." });
    } else if (takenEmail.length > 0) {
      res.status(200).json({ message: "Email has already been taken." });
    } else {
      //encryption
      let password = await bcrypt.hash(req.body.password, 10);

      let user = new User(
        username.toLowerCase(),
        password,
        email.toLowerCase(),
        major
      );
      user = await user.save();
      res.status(201).json({ message: "user created.", user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let [dbUser, _] = await User.findByUsername(username.toLowerCase());

    if (dbUser.length == 0) {
      res.status(200).json({ message: "Username not in use." });
    } else {
      //encryption
      bcrypt.compare(password, dbUser[0].password).then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            username: dbUser[0].username,
          };
          console.log(payload);
          jwt.sign(
            payload,
            process.env.JWT_SECRET || "supersecret",

            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.status(200).json({ message: "err" });
              return res.json({
                message: "Success",
                token: "Bearer " + token,
                username: dbUser[0].username,
              });
            }
          );
        } else {
          return res
            .status(200)
            .json({ message: "Invalid Username or Password" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const [user, _] = await User.findAll();

    res.status(200).json({ count: user.length, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUserByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let [user, _] = await User.deleteByUsername(username);

    res.status(200).json({ message: "user deleted.", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserPasswordByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let { password } = req.body;

    let [user, _] = await User.updatePasswordByUsername(username, password);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.findUserInCommunityByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let [userCommunities, _] = await User.findInCommunityByUsername(username);

    res.status(200).json({ userCommunities });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addUserInCommunityByUsernameCommunity = async (req, res, next) => {
  try {
    let username = req.user.username;

    let { community } = req.body;

    let [newInCommunity, _] = await User.addInCommunityByUsernameCommunity(
      username,
      community
    );

    res.status(201).json({ message: "in_community created.", newInCommunity });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteUserInCommunityByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let { community_name } = req.body;

    let [in_community, _] = await User.deleteInCommunityByUsernameCommunity(
      username,
      community_name
    );

    res.status(200).json({ message: "in_community deleted.", in_community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
