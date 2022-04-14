part of menuoc;

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  bool wrongCredential = false;

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
                "Login",
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
              wrongCredential
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
                      var data = json.encode({
                        "username": username,
                        "password": password
                      });
                      Map response = await Session.post("/user/login", data);
                      if (response["message"] != "Success") {
                        setState(() {
                          wrongCredential = true;
                          usernameController.clear();
                          passwordController.clear();
                        });
                      } else {
                        setState(() {
                          wrongCredential = false;
                          globals.currentUser.isLoggedIn = true;
                          globals.currentUser.username = response["username"];
                        });
                        Navigator.pop(context);
                      }
                    },
                    child: const Text(
                      "Submit",
                      style: TextStyle(fontSize: 30, color: Colors.white),
                    )),
              ),
              TextButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const RegisterPage()));
                  },
                  child: const Text(
                    "Don't have an account? Register here",
                    style: TextStyle(fontSize: 15, color: Colors.black),
                  )),
              TextButton(
                  onPressed: () {
                    Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const AdminLoginPage()))
                        .then((_) => Navigator.pop(context));
                  },
                  child: const Text(
                    "Admin Login",
                    style: TextStyle(fontSize: 15, color: Colors.black),
                  )),
            ],
          ),
        ));
  }
}
