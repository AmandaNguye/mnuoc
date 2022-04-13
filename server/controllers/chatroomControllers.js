const Chatroom = require("../models/Chatroom");

exports.createNewChatroom = async (req, res, next) => {
  try {
    let user1 = req.user.username;
    let { title, user2 } = req.body;
    let chatroom = new Chatroom(title, user1, user2);

    chatroom = await chatroom.save();

    res.status(201).json({ message: "chatroom created.", chatroom });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllChatroomsByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;

    let [chatroom, _] = await Chatroom.findAllByUsername(username);

    res.status(200).json({ chatroom });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteChatroomByChatId = async (req, res, next) => {
  try {
    let chat_id = req.params.chid;

    let [chatroom, _] = await Chatroom.deleteByChatId(chat_id);

    res.status(200).json({ message: "chatroom deleted.", chatroom });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateChatroomTitleByChatId = async (req, res, next) => {
  try {
    let { chat_id, title } = req.body;

    let [chatroom, _] = await Chatroom.updateChatTitleByChatId(chat_id, title);

    res.status(200).json({ chatroom });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
