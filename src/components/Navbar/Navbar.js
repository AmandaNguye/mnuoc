import "./Navbar.css";
import React from "react";
import HomeButton from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="navbar">
			<Link className="navbar__home" to="/">
				<img src={HomeButton} alt="" />
			</Link>
		</nav>
	);
}
