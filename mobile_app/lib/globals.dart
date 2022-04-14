library globals;
const String url = "https://meanduofcdatabase.herokuapp.com";




CurrentUser currentUser = CurrentUser(false, "", false);
class CurrentUser
{
  bool isLoggedIn;
  String username;
  bool isAdmin;

  CurrentUser(this.isLoggedIn, this.username, this.isAdmin);
}