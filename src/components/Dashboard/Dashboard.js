import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import PostCard from "./PostCard/PostCard";
import "./Dashboard.css";

export default function Dashboard() {
	const [words, setWords] = useState([]);

	const generateWord = () => {
		return "a".repeat(Math.floor(Math.random() * 400));
	};

	useEffect(() => {
		let temp = [];
		for (let i = 0; i < 10; i++) {
			temp.push(generateWord());
		}
		setWords(temp);
	}, []);

	const postCards = words.map((e, index) => (
		<PostCard key={index} id={index} word={e} />
	));

	return (
		<>
			<Navbar loggedIn={true} />
			<div className="dashboard">
				<div className="dashboard__top">
					<h1>Dashboard Header</h1>
				</div>
				<div className="dashboard__body">{postCards}</div>
			</div>
		</>
	);
}
