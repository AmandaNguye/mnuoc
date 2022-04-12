import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Login.css";

export default function Login() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="login">
			<Navbar loggedIn={false} />
			<section className="login__body">
				<h3 className="login__body__title">Enter Login Details</h3>
				<form action="" className="login__body__form" onSubmit={handleSubmit}>
					<input
						className="login__body__form__input login__body__form__input--username"
						type="text"
						placeholder="Username"
					/>
					<input
						className="login__body__form__input login__body__form__input--password"
						type="password"
						name=""
						placeholder="Password"
					/>
					<input className="login__body__form__submit" type="submit" name="" />
				</form>
			</section>
		</div>
	);
}
