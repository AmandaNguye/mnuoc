import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [failed, setFailed] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFailed(false);
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		};
		const responseUser = await fetch(
			"https://meanduofcdatabase.herokuapp.com/user/login",
			payload
		);
		const dataUser = await responseUser.json();
		if (dataUser.message == "Success") {
			console.log(`Logged in as user: ${dataUser.username}`);
			localStorage.setItem("token", dataUser.token);
			window.location.href = "/dashboard";
			return;
		}

		const responseAdmin = await fetch(
			"https://meanduofcdatabase.herokuapp.com/admin/login",
			payload
		);
		const dataAdmin = await responseAdmin.json();
		console.log("here");
		if (dataAdmin.message == "Success") {
			console.log(`Logged in as admin: ${dataUser.username}`);
			localStorage.setItem("token", dataAdmin.token);
			window.location.href = "/dashboard/home";
			return;
		}

		setFailed(true);
		setUsername("");
		setPassword("");
	};

	// Fail timeout
	useEffect(() => {
		setTimeout(() => {
			setFailed(false);
		}, 5000);
	}, [failed]);

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
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<input
						className="login__body__form__input login__body__form__input--password"
						type="password"
						name=""
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<input className="login__body__form__submit" type="submit" name="" />
					<Link className="login__body__toregister" to="/register">
						Click here to register
					</Link>
					<div className={`login__failed ${failed ? "visible" : "invisible"}`}>
						Login Failed
					</div>
				</form>
			</section>
		</div>
	);
}
