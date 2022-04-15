import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import PostCard from "../Dashboard/PostCard/PostCard";
import { colorList, hash } from "../../colorList";
import Comment from "../Comment/Comment";

export default function Profile() {
	const [pageType, setPageType] = useState("posts");
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState("");
	const [comments, setComments] = useState([]);
	const [profile, setProfile] = useState([]);
	const [detailsText, setDetailsText] = useState("");

	// useEffect(async () => {
	// 	try {
	// 		const payload = {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				"x-access-token": localStorage.getItem("token"),
	// 			},
	// 		};
	// 		const response = await fetch(
	// 			'https://meanduofcdatabase.herokuapp.com/profile',
	// 			payload
	// 		);
	// 		const profileData = (await response.json()).profile;
	// 		console.log(profileData.username);
	// 		setUsername(profileData.username);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// });

	const loadProfile = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/profile",
				payload
			);
			const myProfile = (await response.json()).profile;
			setProfile(myProfile);
			console.log(myProfile);
		} catch (error) {
			console.error(error);
		}
	};

	const loadComments = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		setUsername(localStorage.getItem("username"));
		console.log(username);
		if (username) {
			try {
				const response = await fetch(
					"https://meanduofcdatabase.herokuapp.com/comment/username",
					payload
				);
				const allComments = (await response.json()).comments;
				setComments(allComments);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const updateDetails = async (e) => {
		e.preventDefault();
		setDetailsText("");
		const payload = {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				bio: detailsText,
			}),
		};
		try {
			const response = await fetch(
				"https://meanduofcdatabase.herokuapp.com/profile",
				payload
			);
			if (response.ok) {
				console.log(response);
				loadProfile();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadPosts = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		setUsername(localStorage.getItem("username"));
		console.log(username);
		if (username) {
			try {
				const response = await fetch(
					`https://meanduofcdatabase.herokuapp.com/post/username`,
					payload
				);
				const allPosts = (await response.json()).posts;
				setPosts(allPosts);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("isAdmin");
		window.location.href = "/";
	};

	useEffect(() => {
		loadPosts();
		loadComments();
		loadProfile();
	}, [username]);

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

	const commentList = comments.map((comment) => (
		<Comment
			key={comment.comment_id}
			comment_id={comment.comment_id}
			post_id={comment.post_id}
			likes={comment.likes}
			poster={comment.username}
			loadComments={loadComments}
		>
			{comment.text}
		</Comment>
	));

	return (
		<div className="container">
			<Navbar loggedIn={true} />
			<div className="profile">
				<aside className="profile__sidebar">
					<ul className="profile__sidebar__options">
						<a
							className="profile__sidebar__options__choice"
							onClick={() => setPageType("posts")}
						>
							My Posts
						</a>
						<a
							className="profile__sidebar__options__choice"
							onClick={() => setPageType("comments")}
						>
							My Comments
						</a>
						<a
							className="profile__sidebar__options__choice"
							onClick={() => setPageType("details")}
						>
							My Details
						</a>
					</ul>
					<input
						type="button"
						className="profile__sidebar__logout"
						value={"logout"}
						onClick={(e) => handleLogout(e)}
					/>
				</aside>
				<section className="profile__body">
					{pageType === "posts" && <div>{postCards}</div>}
					{pageType === "comments" && <div>{commentList}</div>}
					{pageType === "details" && (
						<div>
							<div className="details_text">
								<span>bio:</span> {profile[0].bio}
							</div>
							<form
								className="details_update_form"
								onSubmit={(e) => updateDetails(e)}
							>
								<h2 className="details_update_title">Update Bio</h2>
								<textarea
									className="update_details_form_input"
									type="text"
									name=""
									id=""
									value={detailsText}
									onChange={(e) => setDetailsText(e.target.value)}
								/>
								<button
									className="edit_details_form_submit"
									type="submit"
									disabled={detailsText === ""}
								>
									Submit
								</button>
							</form>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
