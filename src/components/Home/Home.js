import React from "react";
import "./Home.css";
import Logo from "../../assets/logo_full.svg";

export default function Home() {
	return (
		<div className="home">
			<img className="home--logo" src={Logo} alt="" />
			<input
				type="button"
				className="home--login home--button"
				value={"login"}
			/>
			<input
				type="button"
				className="home--register home--button"
				value={"register"}
			/>
		</div>
	);
}
