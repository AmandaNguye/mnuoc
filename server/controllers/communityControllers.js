const Community = require("../models/Community");

exports.createNewCommunity = async (req, res, next) => {
  try {
    let { community_name, description } = req.body;
    let community = new Community(community_name, description);

    community = await community.save();

    res.status(201).json({ message: "community created.", community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllCommunity = async (req, res, next) => {
  try {
    const [community, _] = await Community.findAll();

    res.status(200).json({ count: community.length, community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommunityByCommunityName = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let [community, _] = await Community.findByCommunityName(community_name);

    res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommunityByCommunityName = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let [community, _] = await Community.deleteByCommunityName(community_name);

    res.status(200).json({ message: "community deleted.", community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCommunityByCommunityName = async (req, res, next) => {
  try {
    let community_name = req.params.community;
    let { description } = req.body;

    let [community, _] = await Community.updateDescriptionByCommunityName(
      community_name,
      description
    );
    res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommunityAdminsByCommunityName = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let [management, _] = await Community.findAdminsByCommunityName(
      community_name
    );

    res.status(200).json({ management });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommunityAdminsByCommunityNameAdmin = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let { admin } = req.body;

    let [management, _] = await Community.deleteAdminByCommunityNameAdmin(
      community_name,
      admin
    );

    res.status(200).json({ message: "management deleted.", management });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addCommunityAdminByCommunityNameAdmin = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let { admin } = req.body;

    let [management, _] = await Community.addAdminByCommunityNameAdmin(
      community_name,
      admin
    );

    res.status(201).json({ message: "management added.", management });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommunityUsersByCommunityName = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let [in_community, _] = await Community.findUsersByCommunityName(
      community_name
    );

    res.status(200).json({ in_community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommunityUsersByCommunityNameUser = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let { username } = req.body;

    let [in_community, _] = await Community.deleteUserByCommunityNameUser(
      community_name,
      username
    );

    res.status(200).json({ message: "in_community deleted.", in_community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addCommunityUserByCommunityNameUser = async (req, res, next) => {
  try {
    let community_name = req.params.community;

    let { username } = req.body;

    let [in_community, _] = await Community.addUserByCommunityNameUser(
      community_name,
      username
    );

    res.status(201).json({ message: "in_community added.", in_community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
