part of menuoc;

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  Chat currentChat = Chat(0, "", "");
  final chatController = TextEditingController();
  final userController = TextEditingController();
  final titleController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool loading = true;
  bool chatLoading = true;

  List<Chat> chats = [];
  List<Message> messages = [];
  List<String> users = [];
  List<String> chattedUsers = [];

  Future<void> _chatFetch() async {
    Map response = await Session.get("/chatroom");
    if (response["code"] == 200) {
      List<Chat> newData = [];
      for (var c in response["chatroom"]) {
        String user = (c["user1"] == globals.currentUser.username)
            ? c["user2"]
            : c["user1"];
        newData.add(Chat(c["chat_id"], c["title"], user));
      }

      setState(() {
        chats = newData;
        if (chats.isNotEmpty) {
          currentChat = chats[0];
        }
        loading = false;
        chatLoading = true;
      });
    }
  }

  Future<void> _messageFetch() async {
    Map response = await Session.get("/message/${currentChat.chatID}");
    if (response["code"] == 200) {
      List<Message> newData = [];
      for (var m in response["message"]) {
        newData.add(Message(m["username"], m["text"]));
      }
      setState(() {
        messages = newData;
        chatLoading = false;
      });
    }
  }

  void _scrollDown() {
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent,
      duration: const Duration(seconds: 2),
      curve: Curves.fastOutSlowIn,
    );
  }

  @override
  void initState() {
    _chatFetch().then((_) => {
          if (chats.isNotEmpty) {_messageFetch()}
        });
    super.initState();
  }

  @override
  void dispose() {
    chatController.dispose();
    userController.dispose();
    titleController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _messageFetch,
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pop(context);
            }, //To Home Page
          ),
          title: loading
              ? const Center(
                  child: CircularProgressIndicator(
                  color: Colors.black,
                ))
              : DropdownButtonFormField<Chat>(
                  decoration: InputDecoration(
                    enabledBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.white, width: 2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.white, width: 2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                  dropdownColor: Colors.white,
                  value: currentChat,
                  icon: const Icon(Icons.arrow_downward),
                  elevation: 16,
                  style: const TextStyle(color: Colors.black),
                  onChanged: (Chat? newValue) {
                    setState(() {
                      currentChat = newValue!;
                    });
                    _messageFetch();
                  },
                  items: chats.map<DropdownMenuItem<Chat>>((Chat value) {
                    return DropdownMenuItem<Chat>(
                      value: value,
                      child: Text(value.user + "@" + value.title),
                    );
                  }).toList(),
                ),
          actions: <Widget>[
            IconButton(
                onPressed: () async {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: const Text("Create a new Chat"),
                          content: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: <Widget>[
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: TextFormField(
                                      controller: userController,
                                      decoration: const InputDecoration(
                                        hintText: "Username",
                                        border: OutlineInputBorder(),
                                      )),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: TextFormField(
                                      controller: titleController,
                                      decoration: const InputDecoration(
                                        hintText: "Chat Title",
                                        border: OutlineInputBorder(),
                                      )),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ElevatedButton(
                                    child: const Text("Save"),
                                    onPressed: () async {
                                      String user = userController.text;
                                      String title = titleController.text;
                                      var data = json.encode({
                                        "user2": user,
                                        "title": title,
                                      });
                                      Map response =
                                          await Session.post("/chatroom", data);
                                      if (response["code"] == 201) {
                                        userController.clear();
                                        titleController.clear();
                                        Navigator.of(context).pop();
                                        _chatFetch();
                                      }
                                      else
                                      {
                                        userController.clear();
                                        titleController.clear();
                                      }
                                    },
                                  ),
                                )
                              ]),
                        );
                      });
                },
                icon: const Icon(Icons.add))
          ],
        ),
        body: Column(
          children: <Widget>[
            const SizedBox(height: 20),
            Expanded(
                child: chatLoading
                    ? const Center(
                        child: CircularProgressIndicator(
                        color: Colors.black,
                      ))
                    : ListView.separated(
                        controller: _scrollController,
                        separatorBuilder: (BuildContext context, int index) =>
                            const Divider(),
                        itemCount: messages.length,
                        itemBuilder: (context, index) {
                          bool sendByCurrentUser = messages[index].sender ==
                              globals.currentUser.username;
                          return Column(
                            crossAxisAlignment: (sendByCurrentUser)
                                ? CrossAxisAlignment.end
                                : CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                    color: sendByCurrentUser
                                        ? Colors.pinkAccent
                                        : Colors.lightBlueAccent,
                                    borderRadius: const BorderRadius.all(
                                        Radius.circular(20))),
                                child: Text(
                                  messages[index].message,
                                  style: const TextStyle(fontSize: 20),
                                ),
                              ),
                            ],
                          );
                        })),
            Container(
                padding: const EdgeInsets.symmetric(vertical: 2.0),
                child: Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                  // First child is enter comment text input
                  Expanded(
                    child: TextFormField(
                      controller: chatController,
                      autocorrect: true,
                      decoration: InputDecoration(
                        hintText: "Send message...",
                        enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        border: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                    ),
                  ),
                  // Second child is button
                  IconButton(
                    icon: const Icon(Icons.send),
                    color: Colors.black,
                    iconSize: 20.0,
                    onPressed: () async {
                      String message = chatController.text;
                      if(message.isEmpty)
                      {
                        _messageFetch();
                        _scrollDown();
                      }
                      else
                      {
                        var data = json.encode({"text": message});
                        Map res = await Session.post(
                            "/message/${currentChat.chatID}", data);
                        if (res["code"] == 201) {
                          _messageFetch();
                          chatController.clear();
                          _scrollDown();
                        }
                      }
                    },
                  )
                ])),
          ],
        ),
      ),
    );
  }
}
