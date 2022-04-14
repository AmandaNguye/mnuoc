import React, { useState, useEffect } from "react";
import "./ManagementForm.css";

export default function ManagementForm(props) {
	console.log(props);
	const [title, setTitle] = useState("");
	const [allUsers, setAllUsers] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		loadAllUsers();
	}, []);
	const loadAllUsers = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/user",
				payload
			);
			const users = (await response.json()).user;
			setAllUsers(users);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				username: title,
			}),
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/community/${props.currentCommunity.community_name}/users`,
				payload
			);
			if (response.ok) {
				console.log(await response.json());
			}
			props.handlePopupClose(e);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				username: title,
			}),
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/community/${props.currentCommunity.community_name}/users`,
				payload
			);
			if (response.ok) {
				console.log(await response.json());
			}
			props.handlePopupClose(e);
		} catch (error) {
			console.error(error);
		}
	};

	return props.trigger ? (
		<div className="background">
			<form className="managementform">
				<div className="managementform__header">
					<button
						className="managementform__close"
						onClick={(e) => props.handlePopupClose(e)}
					>
						x
					</button>
				</div>
				<h2 className="managementform__info managementform__text">
					Manage Community | {props.currentCommunity.community_name}
				</h2>
				<div className="managementform__title">
					<h3 className="managementform__text">User Lookup</h3>
					<input
						type="text"
						name=""
						id=""
						className="managementform__title__input"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => setShowDropdown(false)}
					/>
					<UserLookupDropdown
						data={allUsers}
						showDropdown={showDropdown}
						lookupText={title}
						setLookupText={setTitle}
					/>
				</div>
				<button
					className="managementform__submit"
					type="submit"
					onClick={(e) => {
						handleAdd(e);
						setTitle("");
					}}
				>
					Add
				</button>
				<button
					className="managementform__submit"
					type="submit"
					onClick={(e) => {
						handleDelete(e);
						setTitle("");
					}}
				>
					Remove
				</button>
			</form>
		</div>
	) : (
		""
	);
}

function UserLookupDropdown(props) {
	const names = props.data
		.filter((user) => user.username.includes(props.lookupText))
		.map((user) => (
			<div
				key={user.username}
				className="lookup__dropdown__item--com"
				onMouseDown={() => props.setLookupText(user.username)}
			>
				{user.username}
			</div>
		));
	return (
		props.showDropdown && <div className="lookup__dropdown--com">{names}</div>
	);
}
