part of menuoc;

class AdminPage extends StatefulWidget {
  const AdminPage({Key? key}) : super(key: key);

  @override
  _AdminPageState createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final communitiesController = TextEditingController();
  final descriptionController = TextEditingController();
  List<String> communities= [];

  Future<void> _communitiesFetch() async {
    //Map response = await Session.get("/admin/management");
    Map response = await Session.get("/community/");

    if (response["code"] == 200 ) {
      List<String> newCommunity = [];
      for (Map c in response["community"]) {
        newCommunity.add(c["community_name"]);
      }
      setState(() {
        communities = newCommunity;
      });
    }
  }


  @override
  void initState() {
    super.initState();
      _communitiesFetch();
  }

  @override
  void dispose() {
    descriptionController.dispose();
    communitiesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: FittedBox(
            fit: BoxFit.fitWidth,
            child: Text("${globals.currentUser.username}'s Admin Page")),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          }, //To Home Page
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: (){
              globals.currentUser = globals.CurrentUser(false, "", false);
              storage.deleteAll();
              Navigator.pop(context);
            },

          )
        ],
      ),
      body: ListView(
        children: <Widget>[

          const Text("Communities", style: TextStyle(fontSize: 30)),
          ListView.separated(
              separatorBuilder: (BuildContext context, int index) => const Divider(thickness: 0, height: 20, color: Colors.white,),
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
            itemCount: communities.length,
            itemBuilder: (BuildContext context, int index) {
                  return Container(
                    color: randomColor(index),
                    child: Row(
                      children: <Widget>[
                        Container(
                          padding: const EdgeInsets.all(5),
                          height: 35.0,
                          alignment: Alignment.topLeft,
                          child: Text(
                            communities[index],
                            style: const TextStyle(fontSize: 25),
                          ),
                        ),
                        const Spacer(),
                        IconButton(
                            onPressed: () async {
                              Map response = await Session.delete("/community/${communities[index]}", json.encode({}));
                              if(response["code"] == 200)
                              {
                                _communitiesFetch();
                              }
                            },
                            icon: const Icon(Icons.clear)
                        )
                      ]
                    ),
                  );
                },
              )
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
              context: context,
              builder: (BuildContext context) {
                return AlertDialog(
                    content: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                  controller: communitiesController,
                                  decoration: const InputDecoration(
                                    hintText: "New Community",
                                    border: OutlineInputBorder(),
                                  )),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                  controller: descriptionController,
                                  decoration: const InputDecoration(
                                    hintText: "Description",
                                    border: OutlineInputBorder(),
                                  )),
                            ),
                            
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: ElevatedButton(
                                child: const Text("Save"),
                                onPressed: () async {
                                  String com = communitiesController.text;
                                  String des = descriptionController.text;
                                  var data = json.encode({
                                    "community_name" : com,
                                    "description": des
                                  });
                                  Map response = await Session.post("/community", data);
                                  log(response.toString());
                                  if(response["code"] == 201)
                                  {
                                    _communitiesFetch();
                                    communitiesController.clear();
                                    descriptionController.clear();
                                    Navigator.of(context).pop();
                                  }
                                  else
                                  {
                                    communitiesController.clear();
                                    descriptionController.clear();
                                  }
                                },
                              ),
                            )
                          ]),
                    );
              });
        },
        tooltip: 'Add new community',
        child: const Icon(Icons.add),
        backgroundColor: Colors.pink.shade200,
      ),
    );
  }
}
