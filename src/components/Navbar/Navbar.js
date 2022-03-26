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
			<Link className="navbar__link navbar__link--one" to="/">
				Link One
			</Link>
			<Link className="navbar__link navbar__link--two" to="/">
				Link Two
			</Link>
			<Link className="navbar__link navbar__link--three" to="/">
				Link Three
			</Link>
		</nav>
	);
}
