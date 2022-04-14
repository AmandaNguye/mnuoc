part of menuoc;

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final usernameController = TextEditingController();
  final passWordController = TextEditingController();
  final emailController = TextEditingController();
  bool error = false;

  @override
  void dispose() {
    usernameController.dispose();
    passWordController.dispose();
    emailController.dispose();
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
                "Registration",
                style: TextStyle(fontSize: 40, color: Colors.pink),
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
                  controller: emailController,
                  decoration: const InputDecoration(
                    hintText: "Email",
                    border: OutlineInputBorder(),
                  )),
              const SizedBox(height: 10),
              TextField(
                  controller: passWordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: "Password",
                    border: OutlineInputBorder(),
                  )),
              const SizedBox(height: 20),
              error
                  ? const Text(
                      "Error: Invalid input",
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
                      String password = passWordController.text;
                      String email = emailController.text;
                      var data = json.encode({
                        "username": username,
                        "email": email,
                        "password": password
                      });

                      Map response = await Session.post("/user/register", data);
                      if (response["message"] != "user created.") {
                        setState(() {
                          error = true;
                          usernameController.clear();
                          passWordController.clear();
                          emailController.clear();
                        });
                      } else {
                        Navigator.pop(context);
                      }
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
