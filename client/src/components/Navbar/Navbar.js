import "./Navbar.css";
import React, { useState } from "react";
import HomeButton from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar({ loggedIn }) {
	const [showHomeText, setShowHomeText] = useState(false);
	const onHomeEnter = () => {
		setShowHomeText(true);
	};
	const onHomeExit = () => {
		setShowHomeText(false);
	};
	return (
		<div>
			<nav className="navbar">
				<Link className="navbar__home" to={loggedIn ? "/dashboard" : "/"}>
					<img
						src={HomeButton}
						alt=""
						onMouseOver={onHomeEnter}
						onMouseLeave={onHomeExit}
					/>
				</Link>
				{loggedIn && (
					<>
						<div className="navbar__search">
							<input
								className="navbar__search__button"
								type="button"
								value="Current Community"
								input
							/>
						</div>
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
