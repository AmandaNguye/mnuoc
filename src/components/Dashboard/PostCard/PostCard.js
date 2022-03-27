import React, { useEffect, useState } from "react";
import "./PostCard.css";

export default function PostCard(props) {
	return (
		<div
			className={`postcard ${props.word.length > 200 ? "postcard--big" : null}`}
		>
			<h3 className="postcard__title">Title</h3>
			<div className="postcard__text">{props.word}</div>
			<div className="postcard__footer">. . .</div>
		</div>
	);
}
