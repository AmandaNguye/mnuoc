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
    let { community_name } = req.body;

    let [community, _] = await Community.findByCommunityName(community_name);

    res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommunityByCommunityName = async (req, res, next) => {
  try {
    let { community_name } = req.body;

    let [community, _] = await Community.deleteByCommunityName(community_name);

    res.status(200).json({ message: "community deleted.", community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCommunityByCommunityName = async (req, res, next) => {
  try {
    let { community_name, description } = req.body;

    let [community, _] = await Community.updateByCommunityName(
      community_name,
      description
    );
    res.status(200).json({ community });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
