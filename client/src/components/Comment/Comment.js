import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./Comment.css";

export default function Comment(props) {
	return (
		<div className="comment">
			<div className="comment___ratings">
				<FaArrowUp />
				<div className="comment__ratings__likes">{props.likes}</div>
				<FaArrowDown />
			</div>
			<div className="comment__body">Comment:{props.children}</div>
		</div>
	);
}
