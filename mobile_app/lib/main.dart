library menuoc;

import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:multi_select_flutter/multi_select_flutter.dart';
import 'globals.dart' as globals;

part 'homepage.dart';
part 'login.dart';
part 'register.dart';
part 'chat.dart';
part 'detailed_post.dart';
part 'profile.dart';
part 'admin_login.dart';
part 'admin_page.dart';

const storage =  FlutterSecureStorage();

void main() {
  runApp(const MyApp());
  storage.deleteAll();
}


Map<int, Color> color = {
  50: const Color.fromRGBO(136, 14, 79, .1),
  100: const Color.fromRGBO(136, 14, 79, .2),
  200: const Color.fromRGBO(136, 14, 79, .3),
  300: const Color.fromRGBO(136, 14, 79, .4),
  400: const Color.fromRGBO(136, 14, 79, .5),
  500: const Color.fromRGBO(136, 14, 79, .6),
  600: const Color.fromRGBO(136, 14, 79, .7),
  700: const Color.fromRGBO(136, 14, 79, .8),
  800: const Color.fromRGBO(136, 14, 79, .9),
  900: const Color.fromRGBO(136, 14, 79, 1),
};
const String logoAsset = 'assets/logo.svg';
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Me&UofC',
      theme: ThemeData(
        primarySwatch: MaterialColor(0XFFFCE4EC, color),
      ),
      home: const HomePage(),
    );
  }
}

class Session {

  static Future<Map> put(String path, dynamic data) async{
    Map<String, String> headers = {"x-access-token" : "", 'Content-Type': 'application/json'};
    String? jwtToken = await storage.read(key: "jwt");
    if(jwtToken != null){
      headers["x-access-token"] = jwtToken;
    }
    http.Response response = await http.put(Uri.parse(globals.url + path) , body: data, headers: headers);
    Map body = json.decode(response.body);
    body["code"] = response.statusCode;
    return body;
  }

  static Future<Map> delete(String path, dynamic data) async{
    Map<String, String> headers = {"x-access-token" : "", 'Content-Type': 'application/json'};
    String? jwtToken = await storage.read(key: "jwt");
    if(jwtToken != null){
      headers["x-access-token"] = jwtToken;
    }
    http.Response response = await http.delete(Uri.parse(globals.url + path) , body: data, headers: headers);
    Map body = json.decode(response.body);
    body["code"] = response.statusCode;
    return body;
  }

  static Future<Map> get(String path) async {
    Map<String, String> headers = {"x-access-token" : "", 'Content-Type': 'application/json'};
    String? jwtToken = await storage.read(key: "jwt");
    if(jwtToken != null){
      headers["x-access-token"] = jwtToken;
    }
    http.Response response = await http.get(Uri.parse(globals.url + path) , headers: headers);
    Map body = json.decode(response.body);
    body["code"] = response.statusCode;
    return body;
  }

  static Future<Map> post(String path, dynamic data) async {
    Map<String, String> headers = {"x-access-token" : "", 'Content-Type': 'application/json'};
    String? jwtToken = await storage.read(key: "jwt");
    if(jwtToken != null){
      headers["x-access-token"] = jwtToken;
    }

    http.Response response = await http.post(Uri.parse(globals.url + path) , body: data, headers: headers);
    String? token = json.decode(response.body)["token"];
    if (token != null) {
      await storage.write(key: "jwt", value: token);
    }
    Map body = json.decode(response.body);
    body["code"] = response.statusCode;
    return body;
  }
}


class Post {
  String title;
  String content;
  String creator;
  int postId;

  Post(this.title, this.content, this.postId, this.creator);
}

class Comment{
  String text;
  String user;
  int commentId;
  int postId;

  Comment(this.text, this.user, this.commentId, this.postId);
}

class Profile{
  String tag;
  String bio;

  Profile(this.tag, this.bio);
}

class Chat{
  int chatID;
  String title;
  String user;

  Chat(this.chatID, this.title, this.user);
}

class Message{
  String sender;
  String message;

  Message(this.sender, this.message);
}

Color randomColor(index) {
  if (index % 7 == 0) {
    return Colors.white30;
  } else if (index % 6 == 0) {
    return Colors.lightGreenAccent;
  } else if (index % 5 == 0) {
    return Colors.purpleAccent;
  } else if (index % 4 == 0) {
    return Colors.greenAccent;
  } else if (index % 3 == 0) {
    return Colors.cyanAccent;
  } else if (index % 2 == 0) {
    return Colors.tealAccent;
  } else {
    return Colors.orangeAccent;
  }
}
