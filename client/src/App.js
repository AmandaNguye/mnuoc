import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Post from "./components/Post/Post";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Chat />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>
					<Route path="dashboard/:id" element={<Dashboard />}></Route>
					<Route path="profile" element={<Profile />}></Route>
					<Route path="post/:id" element={<Post />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
