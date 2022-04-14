import React from "react";
import "./Home.css";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Home() {
	localStorage.removeItem("username");
	localStorage.removeItem("token");
	return (
		<section className="home">
			<img className="home__logo" src={Logo} alt="" />
			<Link to="/login" type="button" className="home__login home__button">
				LOGIN
			</Link>
			<Link to="/register" className="home__register home__button">
				REGISTER
			</Link>
		</section>
	);
}
