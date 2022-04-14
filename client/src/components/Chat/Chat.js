import React, { useEffect, useState } from "react";
import { FaTimes, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import "./Chat.css";

export default function Chat() {
	const user = localStorage.getItem("username");
	const [stateOpen, setStateOpen] = useState(false);
	const toggleChat = () => {
		setStateOpen((prev) => !prev);
	};

	return user ? (
		stateOpen ? (
			<ChatOpen user={user} handleClick={toggleChat} text={"-"} />
		) : (
			<ChatCollapsed handleClick={toggleChat} text={"open chat"} />
		)
	) : (
		""
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
	const [otherUsers, setOtherUsers] = useState([]);
	const [chatRooms, setChatRooms] = useState([]);
	const [activeChat, setActiveChat] = useState(0);
	const [messages, setMessages] = useState([]);
	const [sendMessage, setSendMessage] = useState("");
	const [lookupText, setLookupText] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [chatPopup, setChatPopup] = useState(false);
	const [chatPopupUser, setChatPopupUser] = useState("");
	const [chatPopupTitle, setChatPopupTitle] = useState("");

	useEffect(async () => {
		loadOtherUsers();
		loadChatRooms();
	}, []);

	useEffect(async () => {
		if (chatPopupUser === "" || chatPopupTitle === "") return;
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				user2: chatPopupUser,
				title: chatPopupTitle,
			}),
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/chatroom`,
				payload
			);
			if (response.ok) {
				loadChatRooms();
				setChatPopupUser("");
				setChatPopupTitle("");
			}
		} catch (error) {
			console.error(error);
		}
	}, [chatPopupTitle]);
	const loadOtherUsers = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/user`,
				payload
			);
			if (response.ok) {
				const userData = (await response.json()).user.filter(
					(u) => u.username != props.user
				);
				setOtherUsers(userData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadChatRooms = async () => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/chatroom`,
				payload
			);
			if (response.ok) {
				setChatRooms((await response.json()).chatroom);
			}
		} catch (error) {}
	};

	const loadMessages = async (chatId) => {
		const payload = {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/message/${chatId}`,
				payload
			);
			if (response.ok) {
				setMessages((await response.json()).message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadActiveChat = (chatId) => {
		setActiveChat(chatId);
		loadMessages(chatId);
	};

	const createChatRoom = (username) => {
		setChatPopupUser(username);
		setChatPopup(true);
	};

	const createText = async (e) => {
		e.preventDefault();
		const payload = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				text: sendMessage,
			}),
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/message/${activeChat}`,
				payload
			);
			if (response.ok) {
				loadMessages(activeChat);
			}
		} catch (error) {
			console.error(error);
		}
		setSendMessage("");
	};
	const contacts = chatRooms.map((contact) => (
		<Contact
			key={contact.chat_id}
			chat_id={contact.chat_id}
			title={contact.title}
			activeChat={activeChat}
			loadActiveChat={loadActiveChat}
			loadChatRooms={loadChatRooms}
		>
			<b>{contact.title}</b> ({contact.user2})
		</Contact>
	));

	const allMessages = messages.map((m) => (
		<Message key={m.message_id} data={m} user={props.user} />
	));

	return (
		<div className="chat chat__open">
			{chatPopup && (
				<ChatPopup
					chatPopupUser={chatPopupUser}
					setChatPopup={setChatPopup}
					setChatPopupTitle={setChatPopupTitle}
				/>
			)}
			<div className="chat__open__lookup">
				<input
					type="text"
					className="chat__open__lookup__input"
					placeholder="Lookup User"
					value={lookupText}
					onChange={(e) => setLookupText(e.target.value)}
					onFocus={() => setShowDropdown(true)}
					onBlur={(e) => {
						setShowDropdown(() => false);
					}}
				/>
				<UserLookupDropdown
					data={otherUsers}
					lookupText={lookupText}
					showDropdown={showDropdown}
					createChatRoom={createChatRoom}
				/>
			</div>
			<input
				type="button"
				className="chat__open__toggle"
				onClick={props.handleClick}
				value={props.text}
			/>
			<ul className="chat__open__contacts">{contacts}</ul>
			<form
				className="chat__open__window"
				onSubmit={(e) => {
					createText(e);
				}}
			>
				<ul className="chat__open__window__messages">{allMessages}</ul>
				<input
					className="chat__open__window__input"
					type="text"
					value={sendMessage}
					onChange={(e) => setSendMessage(e.target.value)}
				/>
				<input className="hidden__submit" type="submit" />
			</form>
		</div>
	);
}

function Contact(props) {
	let currentActive = props.activeChat === props.chat_id;
	const handleDelete = async () => {
		const payload = {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
		};
		try {
			const response = await fetch(
				`https://meanduofcdatabase.herokuapp.com/chatroom/${props.chat_id}`,
				payload
			);
			if (response.ok) {
				props.loadActiveChat(currentActive ? 0 : props.activeChat);
				props.loadChatRooms();
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div
			className={`chat__open__contacts__item ${
				currentActive ? "chat__open__contacts__item--active" : ""
			}`}
			onClick={() => props.loadActiveChat(props.chat_id)}
		>
			<div className="chat__open__contacts__item__text">{props.children}</div>
			<FaTimes
				className="chat__open__contacts__item__close"
				onClick={() => handleDelete()}
			/>
		</div>
	);
}

function Message(props) {
	return (
		<>
			<div
				className={`message ${
					props.user == props.data.username ? "message--user" : "message--other"
				}`}
			>
				{props.data.text}
			</div>
		</>
	);
}

function UserLookupDropdown(props) {
	const names = props.data
		.filter((user) => user.username.includes(props.lookupText))
		.map((user) => (
			<div
				key={user.username}
				className="lookup__dropdown__item"
				onMouseDown={() => props.createChatRoom(user.username)}
			>
				{user.username}
			</div>
		));
	return props.showDropdown && <div className="lookup__dropdown">{names}</div>;
}

function ChatPopup(props) {
	const [titleText, setTitleText] = useState("");
	const handleClose = () => {
		props.setChatPopup(false);
	};
	const handleSubmit = () => {
		props.setChatPopupTitle(titleText);
		props.setChatPopup(false);
	};
	return (
		<div className="popup">
			<h1 className="popup__title">Chat Creation w/ {props.chatPopupUser}</h1>
			<h2 className="popup__prompt">Title</h2>
			<input
				className="popup__text"
				type="text"
				name=""
				id=""
				value={titleText}
				onChange={(e) => {
					setTitleText(e.target.value);
				}}
			/>
			<div className="popup__buttons">
				<button
					type="submit"
					className="popup__submit popup__button"
					onClick={() => handleSubmit()}
					disabled={titleText.length === 0}
				>
					<FaPlusCircle />
				</button>
				<button
					className="popup__close popup__button"
					onClick={() => handleClose()}
				>
					<FaTimesCircle />
				</button>
			</div>
		</div>
	);
}
