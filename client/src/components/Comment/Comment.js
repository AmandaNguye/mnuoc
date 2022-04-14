import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaTrashAlt } from "react-icons/fa";
import "./Comment.css";

export default function Comment(props) {
	const { poster, post_id, comment_id, loadComments } = props;
	const user = localStorage.getItem("username");
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

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
				`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/like`,
				payload
			);

			setLiked(false);
			loadComments();
			return;
		}

		if (disliked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/dislike`,
				payload
			);
			setDisliked(false);
		}

		payload.method = "POST";
		await fetch(
			`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/like`,
			payload
		);
		setLiked(true);
		loadComments();
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
				`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/dislike`,
				payload
			);
			setDisliked(false);
			loadComments();
			return;
		}

		if (liked) {
			await fetch(
				`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/like`,
				payload
			);
			setLiked(false);
		}

		payload.method = "POST";
		await fetch(
			`https://meanduofcdatabase.herokuapp.com/comment/${post_id}/${comment_id}/dislike`,
			payload
		);
		setDisliked(true);
		loadComments();
	};

	return (
		<div className="comment">
			<div className="comment___ratings">
				<FaArrowUp
					className="comment__ratings__button"
					style={liked ? { color: "green" } : {}}
					onClick={() => handleLike()}
				/>
				<div
					className="comment__ratings__likes"
					style={
						props.likes > 0
							? { color: "green" }
							: props.likes < 0
							? { color: "red" }
							: {}
					}
				>
					{props.likes}
				</div>
				<FaArrowDown
					className="comment__ratings__button"
					style={disliked ? { color: "red" } : {}}
					onClick={() => handleDislike()}
				/>
			</div>
			<div className="comment__body">
				<b>{poster}: </b>
				{props.children}
			</div>
			{user === poster && <FaTrashAlt className="comment__delete" />}
		</div>
	);
}
