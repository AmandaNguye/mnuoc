import React, { useState } from "react";
import "./Postform.css";

export default function Postform(props) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	return props.trigger ? (
		<div className="background">
			<form className="postform">
				<div className="postform__header">
					<button
						className="postform__close"
						onClick={(e) => props.handlePopupClose(e)}
					>
						x
					</button>
				</div>
				<h2 className="postform__info postform__text">Create Post</h2>
				<div className="postform__title">
					<h3 className="postform__text">Title</h3>
					<input
						type="text"
						name=""
						id=""
						className="postform__title__input"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="postform__body">
					<h3 className="postform__text">Body</h3>
					<textarea
						type="text"
						name=""
						id=""
						className="postform__body__input"
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
				<button
					className="postform__submit"
					type="submit"
					onClick={(e) => {
						props.handleSubmit(e, title, body);
						setTitle("");
						setBody("");
					}}
				>
					SUBMIT
				</button>
			</form>
		</div>
	) : (
		""
	);
}
