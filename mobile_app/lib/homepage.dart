part of menuoc;

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<String> communities = [];
  String currentCommunity = "";
  List<Post> posts = [];

  final titleController = TextEditingController();
  final textController = TextEditingController();

  Future<void> _refresh() async {
    await _communityFetch();
    await _postsFetch();
  }

  _communityFetch() async {
    if (globals.currentUser.isAdmin) {
      Map response = await Session.get("/community");
      List<String> newData = [];
      if (response["code"] == 200) {
        for (var c in response["community"]) {
          newData.add(c["community_name"]);
        }
      }
      setState(() {
        communities = newData;
        if (communities.isNotEmpty) {
          currentCommunity = communities[0];
        } else {
          currentCommunity = "";
        }
      });
    } else {
      Map response = await Session.get("/user/usercommunities");
      List<String> newData = [];
      if (response["userCommunities"] != null) {
        for (var c in response["userCommunities"]) {
          newData.add(c["community_name"]);
        }
      }
      setState(() {
        communities = newData;
        if (communities.isNotEmpty) {
          currentCommunity = communities[0];
        } else {
          currentCommunity = "";
        }
      });
    }
  }

  Future<void> _postsFetch() async {
    Map response = await Session.get("/post/community/" + currentCommunity);
    List<Post> newData = [];
    if (response["posts"] != null) {
      for (var p in response["posts"]) {
        Post newPost = Post(p["title"], p["text"], p["post_id"], p["username"]);
        newData.add(newPost);
      }
    }
    setState(() {
      posts = newData;
    });
  }

  @override
  void initState() {
    super.initState();
    _communityFetch();
    _postsFetch();
  }

  @override
  void dispose() {
    titleController.dispose();
    textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _refresh,
      child: Scaffold(
        body: CustomScrollView(
          slivers: <Widget>[
            SliverAppBar(
              leading: IconButton(
                icon: SvgPicture.asset(
                  logoAsset,
                  semanticsLabel: "Me&UofC",
                ),
                onPressed: () {}, //To Home Page
              ),
              floating: true,
              pinned: true,
              snap: false,
              centerTitle: true,
              title: globals.currentUser.isAdmin
                  ? const Text(
                      'Admin Home Page',
                      style: TextStyle(color: Colors.black),
                    )
                  : const Text(
                      'Home Page',
                      style: TextStyle(color: Colors.black),
                    ),
              actions: [
                (globals.currentUser.isLoggedIn && !globals.currentUser.isAdmin)
                    ? IconButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const ChatPage()));
                        }, //To Chat Page
                        tooltip: 'Open Chat',
                        icon: const Icon(Icons.chat),
                        color: Colors.pinkAccent,
                      )
                    : Container(),
                globals.currentUser.isLoggedIn
                    ? IconButton(
                        onPressed: () {
                          if (globals.currentUser.isAdmin) {
                            Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const AdminPage()))
                                .then((_) => _refresh());
                          } else {
                            Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const ProfilePage()))
                                .then((_) => _refresh());
                          }
                        },
                        icon: const Icon(Icons.account_circle),
                        color: Colors.pinkAccent,
                      )
                    : IconButton(
                        onPressed: () {
                          Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const LoginPage()))
                              .then((_) => _refresh());
                        },
                        icon: const Icon(Icons.login),
                        color: Colors.pinkAccent,
                      ),
              ],
              bottom: AppBar(
                title: communities.isEmpty
                    ? const Center(child: CircularProgressIndicator())
                    : DropdownButtonFormField<String>(
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.white, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          border: OutlineInputBorder(
                            borderSide:
                                const BorderSide(color: Colors.white, width: 2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        dropdownColor: Colors.white,
                        value: currentCommunity,
                        icon: const Icon(Icons.arrow_downward),
                        elevation: 16,
                        style: const TextStyle(color: Colors.black),
                        onChanged: (String? newValue) {
                          setState(() {
                            currentCommunity = newValue!;
                            _postsFetch();
                          });
                        },
                        items: communities
                            .map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                      ),
              ),
            ),
            SliverList(
                delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                return Stack(
                  children: <Widget>[
                    Card(
                      child: Column(
                        //mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(5),
                            color: randomColor(index),
                            alignment: Alignment.topLeft,
                            child: Center(
                              child: FittedBox(
                                child: Text(
                                  posts[index].title,
                                  style: const TextStyle(fontSize: 25),
                                ),
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.all(5),
                            color: randomColor(index),
                            height: 140.0,
                            alignment: Alignment.topLeft,
                            child: Text(
                              posts[index].content,
                              style: const TextStyle(fontSize: 25),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Positioned.fill(
                        child: Material(
                            color: Colors.transparent,
                            child: InkWell(
                              onTap: () {
                                Navigator.push(context,
                                    MaterialPageRoute(builder: (context) {
                                  return DetailedPost(index, posts[index]);
                                })).then((_) => {_postsFetch()});
                              }, //Go to the Specific Post Page
                            )))
                  ],
                );
              },
              childCount: posts.length,
            ))
          ],
        ),
        floatingActionButton:
            (globals.currentUser.isLoggedIn && !globals.currentUser.isAdmin)
                ? FloatingActionButton(
                    onPressed: () {
                      //TODO: Create Pop up for create new post
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              title: const Text("Create New Post"),
                              content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: <Widget>[
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: TextFormField(
                                          controller: titleController,
                                          decoration: const InputDecoration(
                                            hintText: "Post Title",
                                            border: OutlineInputBorder(),
                                          )),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: TextFormField(
                                          controller: textController,
                                          decoration: const InputDecoration(
                                            hintText: "Post Content",
                                            border: OutlineInputBorder(),
                                          )),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: ElevatedButton(
                                        child: const Text("Save"),
                                        onPressed: () async {
                                          String title = titleController.text;
                                          String text = textController.text;
                                          var data = json.encode({
                                            "title": title,
                                            "text": text,
                                            "community": currentCommunity,
                                          });
                                          Map response =
                                          await Session.post("/post/", data);
                                          if (response["code"] == 201) {
                                            titleController.clear();
                                            textController.clear();
                                            Navigator.of(context).pop();
                                            _postsFetch();
                                          }
                                        },
                                      ),
                                    )
                                  ]),
                            );
                          });

                    },
                    tooltip: 'Create New post',
                    child: const Icon(Icons.add),
                    backgroundColor: Colors.pink.shade200,
                  )
                : null,
      ),
    );
  }
}
