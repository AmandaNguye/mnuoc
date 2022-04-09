const Admin = require("../models/Admin");

exports.createNewAdmin = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    let admin = new Admin(username, password, email);

    admin = await admin.save();

    res.status(201).json({ message: "admin created.", admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const [admin, _] = await Admin.findAll();

    res.status(200).json({ count: admin.length, admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAdminByUsername = async (req, res, next) => {
  try {
    let { username } = req.body;

    let [admin, _] = await Admin.findByUsername(username);

    res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteAdminByUsername = async (req, res, next) => {
  try {
    let { username } = req.body;

    let [admin, _] = await Admin.deleteByUsername(username);

    res.status(200).json({ message: "admin deleted.", admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateAdminPasswordByUsername = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let [admin, _] = await Admin.updatePasswordByUsername(username, password);

    res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
