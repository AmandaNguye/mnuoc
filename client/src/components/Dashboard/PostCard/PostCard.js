import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

export default function PostCard(props) {
	return (
		<Link
			style={props.style}
			to={`/post/${props.id}`}
			className={`postcard ${props.text.length > 200 ? "postcard--big" : null}`}
		>
			<h3 className="postcard__title">{props.title}</h3>
			<div className="postcard__text">{props.text}</div>
			<div className="postcard__footer">. . .</div>
		</Link>
	);
}
