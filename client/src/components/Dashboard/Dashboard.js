import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PostCard from "./PostCard/PostCard";
import "./Dashboard.css";

export default function Dashboard() {
	const { id } = useParams();
	const [communities, setCommunities] = useState([]);
	const [currentCommunity, setCurrentCommunity] = useState("");
	const [posts, setPosts] = useState([]);

	const [words, setWords] = useState([]);

	const loadCommunities = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/user/usercommunities",
				payload
			);
			const allCommunities = (await response.json()).userCommunities;
			setCommunities(allCommunities);
		} catch (error) {
			console.error(error);
		}
	};

	const loadPosts = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}`,
				payload
			);
			const allPosts = (await response.json()).posts;
			setPosts(allPosts);
		} catch (error) {
			console.error(error);
		}
	};

	//initialization
	useEffect(async () => {
		loadCommunities();
	}, []);

	useEffect(() => {
		setCurrentCommunity(id);
		loadPosts();
	}, [id]);

	const postCards = posts.map((e, index) => (
		<PostCard key={e.post_id} id={e.post_id} title={e.title} text={e.text} />
	));

	return (
		<>
			<Navbar
				loggedIn={true}
				communities={communities}
				currentCommunity={currentCommunity}
				setCommunity={setCurrentCommunity}
			/>
			<div className="dashboard">
				{currentCommunity !== "home" && (
					<div className="dashboard__top">
						<h1>{currentCommunity}</h1>
					</div>
				)}
				<div className="dashboard__body">{postCards}</div>
			</div>
		</>
	);
}
