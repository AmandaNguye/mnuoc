import React, { useState } from "react";
import "./Chat.css";

export default function Chat(props) {
	const [stateOpen, setStateOpen] = useState(false);

	const toggleChat = () => {
		setStateOpen((prev) => !prev);
	};

	return stateOpen ? (
		<ChatOpen handleClick={toggleChat} text={"-"} />
	) : (
		<ChatCollapsed handleClick={toggleChat} text={"open chat"} />
	);
}

function ChatCollapsed(props) {
	return (
		<div className="chat chat__closed">
			<input
				type="button"
				className="chat__closed__toggle"
				onClick={props.handleClick}
				value={props.text}
			/>
		</div>
	);
}

function ChatOpen(props) {
	return (
		<div className="chat chat__open">
			<input
				type="text"
				className="chat__open__lookup"
				placeholder="lookup user"
			/>
			<input
				type="button"
				className="chat__open__toggle"
				onClick={props.handleClick}
				value={props.text}
			/>
			<ul className="chat__open__contacts">
				<div className="chat__open__contacts__item">One</div>
				<div className="chat__open__contacts__item">Two</div>
				<div className="chat__open__contacts__item">Three</div>
			</ul>
			<div className="chat__open__window">
				<div className="chat__open__window__messages">
					<div>you: sup</div>
					<div>friend: do u know how to center a div</div>
					<div>you: i don't even know webdev lol</div>
				</div>
				<input className="chat__open__window__input" type="text" />
			</div>
		</div>
	);
}
