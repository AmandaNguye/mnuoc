import "./Navbar.css";
import React, { useState } from "react";
import HomeButton from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar({ loggedIn }) {
	const [showHomeText, setShowHomeText] = useState(false);
	const onHomeHover = () => {
		setShowHomeText(!showHomeText);
	};
	return (
		<div>
			<nav className="navbar">
				<Link className="navbar__home" to="/dashboard">
					<img
						src={HomeButton}
						alt=""
						onMouseEnter={onHomeHover}
						onMouseLeave={onHomeHover}
					/>
				</Link>
				{loggedIn && (
					<>
						<Link className="navbar__link navbar__link--communities" to="/">
							Communities
						</Link>
						<Link className="navbar__link navbar__link--chat" to="/">
							Chat
						</Link>
						<Link className="navbar__link navbar__link--profile" to="/profile">
							Profile
						</Link>
					</>
				)}
			</nav>
			<div className="popups">
				{showHomeText && <div className="popups__home">Home</div>}
			</div>
		</div>
	);
}
