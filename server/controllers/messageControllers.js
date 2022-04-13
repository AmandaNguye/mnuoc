const Message = require("../models/Message");

exports.createNewMessage = async (req, res, next) => {
  try {
    let username = req.user.username;
    let chat_id = req.params.chid;
    let { text } = req.body;
    let message = new Message(chat_id, text, username);

    message = await message.save();

    res.status(201).json({ message: "Message created.", message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const [messages, _] = await Message.findAll();

    res.status(200).json({ count: messages.length, messages });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getMessageByChatId = async (req, res, next) => {
  try {
    let chatId = req.params.chid;

    let [message, _] = await Message.findByChatId(chatId);

    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteMessageByMessageId = async (req, res, next) => {
  try {
    let messageId = req.params.mid;

    let [message, _] = await Message.deleteByMessageId(messageId);

    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateMessageByMessageId = async (req, res, next) => {
  try {
    let messageId = req.params.mid;
    let { text } = req.body;

    let [message, _] = await Message.updateByMessageId(messageId, text);

    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
