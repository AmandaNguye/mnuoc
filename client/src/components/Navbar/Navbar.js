import "./Navbar.css";
import React, { useEffect, useState } from "react";
import HomeButton from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar(props) {
	const [showHomeText, setShowHomeText] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		setShowDropdown(false);
	}, [props.currentCommunity]);

	const onHomeEnter = () => {
		setShowHomeText(true);
	};
	const onHomeExit = () => {
		setShowHomeText(false);
	};
	const toggleDropdown = () => {
		setShowDropdown(() => setShowDropdown(!showDropdown));
	};

	return (
		<div>
			<nav className="navbar">
				<Link
					className="navbar__home"
					to={props.loggedIn ? "/dashboard/home" : "/"}
				>
					<img
						src={HomeButton}
						alt=""
						onMouseOver={onHomeEnter}
						onMouseLeave={onHomeExit}
					/>
				</Link>
				{props.loggedIn && (
					<>
						{props.onDashboard && (
							<div className="navbar__search">
								<input
									className={`navbar__search__button ${
										showDropdown ? "navbar__search__button--expand" : ""
									}`}
									type="button"
									value={props.currentCommunity}
									onClick={toggleDropdown}
								/>
								{showDropdown && (
									<Dropdown
										currentCommunity={props.currentCommunity}
										communities={props.communities}
									/>
								)}
							</div>
						)}
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

function Dropdown(props) {
	return (
		<ul className="dropdown">
			{props.communities
				.filter((com) => com.community_name !== props.currentCommunity)
				.map((com) => (
					<Link
						key={com.community_name}
						className="dropdown__item"
						to={`/dashboard/${com.community_name}`}
					>
						{com.community_name}
					</Link>
				))}
		</ul>
	);
}
