part of menuoc;

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final bioController = TextEditingController();
  final tagController = TextEditingController();
  List<String> communities = [];
  List<String> communitiesIn = [];
  List<Post> posts = [];
  Profile profile = Profile("", "");

  _communitiesFetch() async {
    Map communityRes = await Session.get("/community/");
    if (communityRes["code"] == 200) {
      List<String> newCommunity = [];
      for (Map c in communityRes["community"]) {
        newCommunity.add(c["community_name"]);
      }
      communities = newCommunity;
    }

    Map communityInRes = await Session.get("/user/usercommunities");
    if (communityInRes["code"] == 200) {
      List<String> newCommunity = [];
      for (Map c in communityInRes["userCommunities"]) {
        newCommunity.add(c["community_name"]);
      }
      communitiesIn = newCommunity;
    }

    for (String c in communitiesIn) {
      communities.remove(c);
    }
    setState(() {});
  }

  Future<void> _postFetch() async {
    Map response = await Session.get("/post/username");
    if (response["code"] == 200) {
      List<Post> newPost = [];
      for (var p in response["posts"]) {
        newPost.add(Post(p["title"], p["text"], p["post_id"], p["username"]));
      }
      setState(() {
        posts = newPost;
      });
    }
  }

  Future<void> _profileFetch() async {
    await Future.delayed(const Duration(milliseconds: 100));
    Map response = await Session.get("/profile/");
    if (response["code"] == 200 && response["profile"].length > 0) {
      var fetchedProfile = response["profile"][0];
      setState(() {
        profile = Profile(fetchedProfile["tag"], fetchedProfile["bio"]);
      });
    } else {
      setState(() {
        profile = Profile("", "");
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _profileFetch();
    _postFetch();
    _communitiesFetch();
  }

  @override
  void dispose() {
    bioController.dispose();
    tagController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: FittedBox(
            fit: BoxFit.fitWidth,
            child: Text("${globals.currentUser.username}@${profile.tag}")),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          }, //To Home Page
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: const Text("Edit Profile"),
                      content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                  controller: tagController,
                                  decoration: const InputDecoration(
                                    hintText: "New Tag",
                                    border: OutlineInputBorder(),
                                  )),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                  controller: bioController,
                                  decoration: const InputDecoration(
                                    hintText: "New Bio",
                                    border: OutlineInputBorder(),
                                  )),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: ElevatedButton(
                                child: const Text("Save"),
                                onPressed: () async {
                                  String inputtedBio = bioController.text;
                                  String inputtedTag = tagController.text;
                                  var data = json.encode({
                                    "tag": inputtedTag,
                                    "bio": inputtedBio,
                                  });
                                  Map response =
                                      await Session.put("/profile/", data);
                                  if (response["code"] == 200) {
                                    _profileFetch();
                                  }

                                  bioController.clear();
                                  tagController.clear();
                                  Navigator.of(context).pop();
                                },
                              ),
                            )
                          ]),
                    );
                  });
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              globals.currentUser = globals.CurrentUser(false, "", false);
              await storage.deleteAll();
              Navigator.pop(context);
            },
          )
        ],
      ),
      body: ListView(
        children: <Widget>[
          Container(
            color: Colors.blueGrey[50],
            child: Text(profile.bio, style: const TextStyle(fontSize: 20)),
          ),
          Text("Posts by ${globals.currentUser.username}",
              style: const TextStyle(fontSize: 30)),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemBuilder: (BuildContext context, int index) {
              return Stack(
                children: <Widget>[
                  Card(
                    child: Column(
                      //mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        Container(
                          padding: const EdgeInsets.all(5),
                          color: randomColor(index),
                          height: 35.0,
                          alignment: Alignment.topLeft,
                          child: Text(
                            posts[index].title,
                            style: const TextStyle(fontSize: 25),
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
                              })).then((_) => _postFetch());
                            }, //Go to the Specific Post Page
                          )))
                ],
              );
            },
            itemCount: posts.length,
          )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
              context: context,
              builder: (BuildContext context) {
                return MultiSelectDialog(
                  title: const Text("Select Communities To Join"),
                  cancelText: const Text(
                    "CANCEL",
                    style: TextStyle(color: Colors.black),
                  ),
                  confirmText: const Text(
                    "OK",
                    style: TextStyle(color: Colors.black),
                  ),
                  initialValue: communitiesIn,
                  items:
                      communities.map<MultiSelectItem<String>>((String value) {
                    return MultiSelectItem<String>(value, value);
                  }).toList(),
                  onConfirm: (List<String> values) async {
                    for (String c in values)
                    {
                      var data = json.encode({
                        "community": c,
                      });
                      await Session.post("/user/usercommunities", data);
                    }
                  },
                );
              });
        },
        tooltip: 'Add Communities',
        child: const Icon(Icons.add),
        backgroundColor: Colors.pink.shade200,
      ),
    );
  }
}
