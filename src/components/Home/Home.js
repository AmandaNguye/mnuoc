import React from "react";
import "./Home.css";
import Logo from "../../assets/logo_full.svg";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<section className="home">
			<img className="home--logo" src={Logo} alt="" />
			<Link to="/login" type="button" className="home--login home--button">
				Login
			</Link>
			<Link to="/register" className="home--register home--button">
				Register
			</Link>
		</section>
	);
}
