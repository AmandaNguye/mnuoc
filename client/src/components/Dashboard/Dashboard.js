import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PostCard from "./PostCard/PostCard";
import "./Dashboard.css";
import Postform from "./PostForm/Postform";
import { colorList, hash } from "../../colorList";
import ManagementForm from "./ManageForm/ManagementForm";

export default function Dashboard() {
	const homeState = {
		community_name: "Home",
		description: "Welcome to Me & U Calgary",
	};
	const { id } = useParams();
	const isAdmin = localStorage.getItem("isAdmin") == "true";
	const [communities, setCommunities] = useState([]);
	const [currentCommunity, setCurrentCommunity] = useState(homeState);
	const [posts, setPosts] = useState([]);
	const [popup, setPopup] = useState(false);
	const [managementPopup, setManagementPopup] = useState(false);

	const handlePopupOpen = () => {
		setPopup(() => true);
		document.body.style.overflow = "hidden";
	};

	const handlePopupClose = (e) => {
		e.preventDefault();
		setPopup(() => false);
		document.body.style.overflow = "auto";
	};

	const handleManagementPopupOpen = () => {
		setManagementPopup(() => true);
		document.body.style.overflow = "hidden";
	};

	const handleManagementPopupClose = (e) => {
		e.preventDefault();
		setManagementPopup(() => false);
		document.body.style.overflow = "auto";
	};

	const handleSubmit = async (e, titleInput, bodyInput) => {
		e.preventDefault();
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				title: titleInput,
				text: bodyInput,
				community: currentCommunity.community_name,
			}),
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/post",
				payload
			);
			if (response) {
				console.log((await response.json()).message);
			}
		} catch (error) {
			console.error(error);
		}
		loadPosts();
		setPopup(() => false);
		document.body.style.overflow = "auto";
	};

	const loadCommunitiesUser = async () => {
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

	const loadCommunitiesAdmin = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/admin/management",
				payload
			);
			const allCommunities = (await response.json()).adminCommunities;
			setCommunities(allCommunities);
		} catch (error) {
			console.error(error);
		}
	};

	const loadCurrentCommunity = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/community/${id}`,
				payload
			);
			const communityData = (await response.json()).community;
			if (communityData.length != 0) {
				setCurrentCommunity(communityData[0]);
				return;
			}
			setCurrentCommunity(homeState);
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
			// notable oversight as it displays all posts in all communities regardless of user
			const response = await fetch(
				id === "home"
					? `https://meanduofcdatabase.herokuapp.com/post`
					: `https://meanduofcdatabase.herokuapp.com/post/community/${id}`,
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
		loadCurrentCommunity();
		if (isAdmin) loadCommunitiesAdmin();
		else loadCommunitiesUser();
	}, []);

	useEffect(() => {
		loadCurrentCommunity();
		loadPosts();
	}, [id]);

	const postCards = posts.map((e) => (
		<PostCard
			key={e.post_id}
			id={e.post_id}
			title={e.title}
			text={e.text}
			style={{
				backgroundColor: colorList[hash(e.post_id)],
			}}
		/>
	));

	return (
		<>
			<Navbar
				loggedIn={true}
				onDashboard={true}
				communities={communities}
				currentCommunity={currentCommunity.community_name}
			/>
			<div className="dashboard">
				{currentCommunity !== "home" && (
					<div className="dashboard__top">
						<h1 className="dashboard__top__title">
							{currentCommunity.community_name}
						</h1>
						<h3 className="dashboard__top__desc">
							{currentCommunity.description}
						</h3>
						{currentCommunity.community_name !== homeState.community_name && (
							<>
								<input
									className="dashboard__top__toggle"
									type="button"
									value="MAKE POST"
									onClick={() => handlePopupOpen()}
								/>
								{isAdmin && (
									<input
										className="dashboard__top__toggle"
										type="button"
										value="MANAGE"
										onClick={() => handleManagementPopupOpen()}
									/>
								)}
							</>
						)}
						<Postform
							trigger={popup}
							handlePopupClose={handlePopupClose}
							handleSubmit={handleSubmit}
						/>
						<ManagementForm
							trigger={managementPopup}
							handlePopupClose={handleManagementPopupClose}
							currentCommunity={currentCommunity}
						/>
					</div>
				)}
				<div className="dashboard__body">{postCards}</div>
			</div>
		</>
	);
}
