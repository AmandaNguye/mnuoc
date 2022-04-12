const Profile = require("../models/Profile");

exports.createNewProfile = async (req, res, next) => {
  try {
    let username = req.user.username;
    let { tag, bio } = req.body;
    let profile = new Profile(username, tag, bio);

    profile = await profile.save();

    res.status(201).json({ message: "profile created.", profile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllProfile = async (req, res, next) => {
  try {
    const [profile, _] = await Profile.findAll();

    res.status(200).json({ count: profile.length, profile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProfileByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let [profile, _] = await Profile.findByUsername(username);

    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProfileByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let [profile, _] = await Profile.deleteByUsername(username);

    res.status(200).json({ message: "profile deleted.", profile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProfileByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let { tag, bio } = req.body;

    let [profile, _] = await Profile.updateByUsername(username, tag, bio);
    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
