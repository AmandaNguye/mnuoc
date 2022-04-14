part of menuoc;

class AdminLoginPage extends StatefulWidget {
  const AdminLoginPage({Key? key}) : super(key: key);

  @override
  _AdminLoginPageState createState() => _AdminLoginPageState();
}

class _AdminLoginPageState extends State<AdminLoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  bool error = false;

  @override
  void dispose() {
    usernameController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pop(context);
            }, //To Home Page
          ),
        ),
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              const Text(
                "Admin Login",
                style: TextStyle(
                  fontSize: 45,
                  color: Colors.pink,
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                  controller: usernameController,
                  decoration: const InputDecoration(
                    hintText: "Username",
                    border: OutlineInputBorder(),
                  )),
              const SizedBox(height: 10),
              TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: "Password",
                    border: OutlineInputBorder(),
                  )),
              const SizedBox(height: 20),
              error
                  ? const Text(
                "Wrong Credential",
                style: TextStyle(color: Colors.red, fontSize: 20),
              )
                  : Container(),
              const SizedBox(height: 10),
              SizedBox(
                width: 200,
                child: TextButton(
                    style: TextButton.styleFrom(
                        textStyle: const TextStyle(fontSize: 20),
                        backgroundColor: Colors.black,
                        fixedSize: Size.infinite),
                    onPressed: () async {
                      String username = usernameController.text;
                      String password = passwordController.text;
                      var data = json
                          .encode({"username": username, "password": password});
                      Map response = await Session.post("/user/login", data);
                      if (response["message"] != "Success") {
                        setState(() {
                          error = true;
                          usernameController.clear();
                          passwordController.clear();
                        });
                      } else {
                        setState(() {
                          globals.currentUser.isLoggedIn = true;
                          globals.currentUser.username = response["username"];
                          globals.currentUser.isAdmin = true;
                        });
                        Navigator.pop(context);
                      }

                      setState(() {
                        globals.currentUser.isLoggedIn = true;
                        globals.currentUser.username = "admin 0";
                        globals.currentUser.isAdmin = true;
                      });
                      Navigator.pop(context);
                    },
                    child: const Text(
                      "Submit",
                      style: TextStyle(fontSize: 30, color: Colors.white),
                    )),
              ),
            ],
          ),
        ));
  }
}
