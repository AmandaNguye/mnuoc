const User = require("../models/User");

exports.createNewUser = async (req, res, next) => {
  try {
    let { username, password, email, major } = req.body;
    let user = new User(username, password, email, major);

    user = await user.save();

    res.status(201).json({ message: "user created.", user });
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

exports.getUserByUsername = async (req, res, next) => {
  try {
    let { username } = req.body;

    let [user, _] = await User.findByUsername(username);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUserByUsername = async (req, res, next) => {
  try {
    let { username } = req.body;

    let [user, _] = await User.deleteByUsername(username);

    res.status(200).json({ message: "user deleted.", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserPasswordByUsername = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let [user, _] = await User.updatePasswordByUsername(username, password);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.findUserInCommunityByUsername = async (req, res, next) => {
  try {
    let { username } = req.body;

    let [userCommunities, _] = await User.findInCommunityByUsername(username);

    res.status(200).json({ userCommunities });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addUserInCommunityByUsernameCommunity = async (req, res, next) => {
  try {
    let { username, community } = req.body;

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
    let { username, community_name } = req.body;

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
