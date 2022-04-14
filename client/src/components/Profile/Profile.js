import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chat from "../Chat/Chat";
import "./Profile.css";

export default function Profile() {
	const [pageType, setPageType] = useState("posts");

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
					/>
				</aside>
				<section className="profile__body">
					{pageType === "posts" && (
						<div>
							posts Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Rem consequatur ipsum quis mollitia laborum doloremque recusandae
							sequi necessitatibus est quod!
						</div>
					)}
					{pageType === "comments" && (
						<div>
							comments Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Facere hic quaerat ex earum ipsam aspernatur! Voluptatum illum
							saepe eum temporibus!
						</div>
					)}
					{pageType === "details" && (
						<div>
							details Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Ipsa earum cum in assumenda animi ipsam unde fuga quos odit iure?
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
