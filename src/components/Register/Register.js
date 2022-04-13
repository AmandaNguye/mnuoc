import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Register.css";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [failed, setFailed] = useState(false);
	const [valid, setValid] = useState(false);
	const [failMessage, setFailMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("hello");
		setFailed(false);
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		};
		const response = await fetch(
			"https://meanduofcdatabase.herokuapp.com/user/register",
			payload
		);
		const data = await response.json();
		if (data.user) {
			console.log(`Logged in as user: ${data.username}`);
			localStorage.setItem("token", data.token);
			window.location.href = "/login";
			return;
		}

		setFailed(true);
		setFailMessage(data.message);
		setUsername("");
		setEmail("");
		setPassword("");
		setPasswordConfirm("");
	};

	// Fail timeout
	useEffect(() => {
		setTimeout(() => {
			setFailed(false);
		}, 5000);
	}, [failed]);

	useEffect(() => {
		setValid(
			username !== "" &&
				email !== "" &&
				password !== "" &&
				password === passwordConfirm
		);
	});

	return (
		<div className="register">
			<Navbar loggedIn={false} />
			<section className="register__body">
				<h3 className="register__body__title">Enter Registration Details</h3>
				<form
					action=""
					className="register__body__form"
					onSubmit={handleSubmit}
				>
					<input
						className="register__body__form__input register__body__form__input--username"
						type="text"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<input
						className="register__body__form__input register__body__form__input--email"
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<input
						className="register__body__form__input register__body__form__input--password"
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<input
						className={`register__body__form__input register__body__form__input--passwordconfirm`}
						type="password"
						placeholder="Password Confirm"
						onChange={(e) => setPasswordConfirm(e.target.value)}
						value={passwordConfirm}
					/>
					<input
						disabled={!valid}
						className={`register__body__form__submit ${valid ? "" : "invalid"}`}
						type="submit"
					/>
					<Link className="register__body__toregister" to="/login">
						Click here to login
					</Link>
					<div
						className={`register__failed ${failed ? "visible" : "invisible"}`}
					>
						{failMessage}
					</div>
				</form>
			</section>
		</div>
	);
}
