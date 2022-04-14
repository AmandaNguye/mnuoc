part of menuoc;

class DetailedPost extends StatelessWidget {
  DetailedPost(this.index, this.post, {Key? key}) : super(key: key);

  final int index;
  final Post post;
  final GlobalKey<CommentListState> _commentKey = GlobalKey();
  final GlobalKey<CommentBoxState> _inputKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: FittedBox(fit: BoxFit.fitWidth, child: Text(post.title)),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              children: <Widget>[
                Container(
                  color: Colors.grey[50],
                  height: 25,
                  child: FittedBox(
                    child: Text("by " + post.creator,
                        style: const TextStyle(fontSize: 15)),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(5),
                  color: Colors.pink[50],
                  alignment: Alignment.topLeft,
                  child: Text(
                    post.content,
                    style: const TextStyle(fontSize: 25),
                  ),
                ),
                Container(
                  color: Colors.pink[50],
                  child: Ratio(
                    id: post.postId,
                    isPost: true,
                    owner: post.creator,
                    postId: post.postId,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                CommentList(key: _commentKey, postID: post.postId),
              ],
            ),
          ),
          Container(
              padding: const EdgeInsets.symmetric(vertical: 2.0),
              child: Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                // First child is enter comment text input
                CommentBox(
                  key: _inputKey,
                ),
                // Second child is button
                IconButton(
                  icon: const Icon(Icons.send),
                  color: Colors.black,
                  iconSize: 20.0,
                  onPressed: () async {
                    String inputted = _inputKey.currentState!.getComment();
                    var data = json.encode({
                      "text": inputted,
                    });
                    Map response = await Session.post(
                        "/comment/${post.postId.toString()}/", data);
                    _commentKey.currentState!._commentFetch(post.postId);
                  },
                )
              ])),
        ],
      ),
    );
  }
}

class CommentBox extends StatefulWidget {
  const CommentBox({Key? key}) : super(key: key);

  @override
  CommentBoxState createState() => CommentBoxState();
}

class CommentBoxState extends State<CommentBox> {
  final commentController = TextEditingController();

  String getComment() {
    String text = commentController.text;
    commentController.clear();
    return text;
  }

  @override
  void dispose() {
    commentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: TextFormField(
        controller: commentController,
        autocorrect: true,
        decoration: const InputDecoration(
          hintText: "Comment",
          border: OutlineInputBorder(
              // borderRadius:
              //     BorderRadius.all(Radius.zero(5.0)),
              borderSide: BorderSide(color: Colors.black)),
        ),
      ),
    );
  }
}

class Ratio extends StatefulWidget {
  final int id;
  final String owner;
  final bool isPost;
  final int postId;

  const Ratio(
      {Key? key,
      required this.id,
      required this.isPost,
      required this.owner,
      required this.postId})
      : super(key: key);

  @override
  _RatioState createState() => _RatioState();
}

class _RatioState extends State<Ratio> {
  int totalLikes = 0;
  int likeState = 0;

  Future<void> _fetchRatio() async {

    if (widget.isPost) {
      Map response = await Session.get("/post/${widget.id}");
      if (response["code"] == 200 && response["post"].length > 0) {
        int newLikeState = 0;
        Map isLiked = await Session.get("/post/${widget.id}/like");
        if (isLiked["code"] == 200) {
          if (isLiked["likes"].length > 0) {
            newLikeState = 1;
          }
        }

        Map isDisliked = await Session.get("/post/${widget.id}/dislike");
        if (isDisliked["code"] == 200) {
          if (isDisliked["dislikes"].length > 0) {
            newLikeState = -1;
          }
        }
        setState(() {
          totalLikes = response["post"][0]["likes"];
          likeState = newLikeState;
        });
      }
    } else {
      Map response =
          await Session.get("/comment/${widget.postId}/${widget.id}");
      if (response["code"] == 200 && response["comment"].length > 0) {
        int newLikeState = 0;

        Map isLiked =
        await Session.get("/comment/${widget.postId}/${widget.id}/like");
        if (isLiked["code"] == 200 && isLiked["likes"].length > 0) {
            newLikeState = 1;
        }

        Map isDisliked =
        await Session.get("/comment/${widget.postId}/${widget.id}/dislike");
        if (isDisliked["code"] == 200 && isDisliked["dislikes"].length > 0) {
            newLikeState = -1;
        }

        setState(() {
          likeState = newLikeState;
          totalLikes = response["comment"][0]["likes"];
        });
      }


    }
  }

  @override
  void dispose() {
    Future.delayed(const Duration(milliseconds: 100));
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _fetchRatio();
  }

  @override
  Widget build(BuildContext context) {
    bool isOwner = globals.currentUser.username == widget.owner ||
        globals.currentUser.isAdmin;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        IconButton(
          icon: (likeState == 1)
              ? const Icon(Icons.thumb_up_alt)
              : const Icon(Icons.thumb_up_alt_outlined),
          onPressed: () async {
            String path = widget.isPost
                ? "/post/${widget.id}/like"
                : "/comment/${widget.postId}/${widget.id}/like";
            String dislikePath = widget.isPost
                ? "/post/${widget.id}/dislike"
                : "/comment/${widget.postId}/${widget.id}/dislike";
            var data = json.encode({});
            if (likeState == 1) {
              await Session.delete(path, data);
            } else if (likeState == -1) {
              await Session.post(path, data);
              await Session.delete(dislikePath, data);
            } else {
              await Session.post(path, data);
            }
            _fetchRatio();
          },
        ),
        Text(
          totalLikes.toString(),
          style: const TextStyle(fontSize: 18),
        ),
        IconButton(
          icon: (likeState == -1)
              ? const Icon(Icons.thumb_down_alt)
              : const Icon(Icons.thumb_down_alt_outlined),
          onPressed: () async {
	          String path = widget.isPost
			          ? "/post/${widget.id}/dislike"
			          : "/comment/${widget.postId}/${widget.id}/dislike";
	          String likePath = widget.isPost
			          ? "/post/${widget.id}/like"
			          : "/comment/${widget.postId}/${widget.id}/like";
	          var data = json.encode({});
	          if (likeState == -1) {
		          await Session.delete(path, data);
	          } else if (likeState == 1) {
		          await Session.post(path, data);
		          await Session.delete(likePath, data);
	          } else {
		          await Session.post(path, data);
	          }
	          _fetchRatio();
          },
        ),
        isOwner
            ? IconButton(
                icon: const Icon(Icons.delete),
                onPressed: () async {
                  var data = json.encode({});
                  if (widget.isPost) {
                    Map response = await Session.delete(
                        "/post/${widget.id.toString()}", data);
                    if (response["code"] == 200) {
                      Navigator.pop(context);
                    }
                  } else {
                    Map response = await Session.delete(
                        "/comment/${widget.postId.toString()}/${widget.id.toString()}/",
                        data);
                    if (response["code"] == 200) {
                      Navigator.pop(context);
                    }
                  }
                },
              )
            : const SizedBox(
                width: 50,
              ),
      ],
    );
  }
}

class CommentList extends StatefulWidget {
  final int postID;

  const CommentList({Key? key, required this.postID}) : super(key: key);

  @override
  CommentListState createState() => CommentListState();
}

class CommentListState extends State<CommentList> {
  List<Comment> comments = [];
  bool loading = true;

  Future<void> _commentFetch(int postID) async {
    Map response = await Session.get("/comment/" + postID.toString());
    if (response["code"] == 200) {
      List<Comment> newData = [];
      for (var c in response["comments"]) {
        newData.add(
            Comment(c["text"], c["username"], c["comment_id"], c["post_id"]));
      }
      setState(() {
        comments = newData;
        loading = false;
      });
    }
  }

  @override
  void initState() {
    _commentFetch(widget.postID);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return loading
        ? const Center(child: CircularProgressIndicator())
        : ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            separatorBuilder: (BuildContext context, int index) =>
                const Divider(),
            itemCount: comments.length,
            itemBuilder: (context, index) {
              return Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(5),
                    color: Colors.blue[100],
                    alignment: Alignment.topLeft,
                    child: Text(
                      comments[index].user + ": " + comments[index].text,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  Container(
                    color: Colors.blue[50],
                    child: Ratio(
                      id: comments[index].commentId,
                      isPost: false,
                      owner: comments[index].user,
                      postId: comments[index].postId,
                    ),
                  ),
                ],
              );
            });
  }
}
