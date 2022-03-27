import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>
					<Route path="dashboard" element={<Dashboard />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
