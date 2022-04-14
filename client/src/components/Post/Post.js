import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaTrashAlt } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Comment from "../Comment/Comment";
import { colorList, hash } from "../../colorList";
import "./Post.css";
export default function Post() {
	const { id } = useParams();
	const user = localStorage.getItem("username");
	const [postData, setPostData] = useState({});
	const [comments, setComments] = useState([]);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [commentText, setCommentText] = useState("");
	const primaryColor = colorList[hash(id)];

	useEffect(async () => {
		loadPost();
		loadComments();
		loadRating();
	}, []);

	const loadPost = async () => {
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
			setPostData((await response.json()).post[0]);
		} catch (error) {
			console.error(error);
		}
	};

	const loadComments = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/comment/${id}`,
				payload
			);
			setComments((await response.json()).comments);
		} catch (error) {
			console.error(error);
		}
	};

	const loadRating = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			let response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/like`,
				payload
			);
			if ((await response.json()).likes.length != 0) {
				setLiked(true);
				return;
			}

			response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/dislike`,
				payload
			);
			if ((await response.json()).dislikes.length != 0) {
				setDisliked(true);
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const createComment = async (e) => {
		e.preventDefault();
		setCommentText("");
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				text: commentText,
			}),
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/comment/${id}`,
				payload
			);
			if (response.ok) {
				console.log(response);
				loadComments();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handlePostDelete = async () => {
		const payload = {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}`,
				payload
			);
			if (response.ok) {
				loadPost();
				window.location.href = "/dashboard/home";
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLike = async () => {
		console.log("Liking");
		let payload = {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		if (liked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/like`,
				payload
			);

			setLiked(false);
			loadPost();
			return;
		}

		if (disliked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/dislike`,
				payload
			);
			setDisliked(false);
		}

		payload.method = "POST";
		await fetch(
			`https://meanduofcdatabase.herokuapp.com/post/${id}/like`,
			payload
		);
		setLiked(true);
		loadPost();
	};

	const handleDislike = async () => {
		console.log("Disliking");
		let payload = {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		if (disliked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/dislike`,
				payload
			);
			setDisliked(false);
			loadPost();
			return;
		}

		if (liked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/post/${id}/like`,
				payload
			);
			setLiked(false);
		}

		payload.method = "POST";
		await fetch(
			`https://meanduofcdatabase.herokuapp.com/post/${id}/dislike`,
			payload
		);
		setDisliked(true);
		loadPost();
	};

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
		<>
			<Navbar loggedIn={true} />
			<div className="post">
				<div className="post__top">
					<h1
						className="post__top__title"
						style={{ backgroundColor: primaryColor }}
					>
						{postData.title}
					</h1>
					<p className="post__top__body">{postData.text}</p>
					<div className="post__top__footer">
						<div className="post__top__footer__username">
							By: {postData.username}
						</div>
						<div className="post__top__footer__community">
							Community: {postData.community}
						</div>
						{user === postData.username && (
							<div className="post__top__footer__delete">
								<FaTrashAlt onClick={() => handlePostDelete()} />
							</div>
						)}
						<div className="post__top__footer__rating">
							<FaArrowUp
								className="post__top__footer__button"
								style={liked ? { color: "green" } : {}}
								onClick={() => handleLike()}
							/>
							<div
								className="post__top__footer__likes"
								style={
									postData.likes > 0
										? { color: "green" }
										: postData.likes < 0
										? { color: "red" }
										: {}
								}
							>
								{postData.likes}
							</div>
							<FaArrowDown
								className="post__top__footer__button"
								style={disliked ? { color: "red" } : {}}
								onClick={() => handleDislike()}
							/>
						</div>
					</div>
				</div>
				<div className="post__comments">
					<form
						className="post__comments__form"
						onSubmit={(e) => createComment(e)}
					>
						<h2
							className="post__comments__form__title"
							style={{ backgroundColor: primaryColor }}
						>
							Comment Section
						</h2>
						<textarea
							className="post__comments__form__input"
							type="text"
							name=""
							id=""
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						/>
						<button
							className="post__comments__form__submit"
							type="submit"
							disabled={commentText === ""}
						>
							Submit
						</button>
					</form>
					<ul className="post__comments__list">{commentList}</ul>
				</div>
			</div>
		</>
	);
}
