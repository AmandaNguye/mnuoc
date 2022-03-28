import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Post.css";
export default function Post() {
	const { id } = useParams();
	return (
		<>
			<Navbar loggedIn={true} />
			<div className="post">
				<div className="post__top">
					<h1 className="post__top__title">This is currently post {id}</h1>
					<p className="post__top__body">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam odio
						doloremque accusantium perferendis repellendus quam aliquid eum enim
						neque quibusdam? A quisquam architecto quae in blanditiis
						laudantium. Officiis, necessitatibus reprehenderit! Facere modi
						dolorem nesciunt error consequatur. Nulla dignissimos perferendis
						fuga quidem sint, aliquam dolore reiciendis ipsa deserunt error,
						fugit adipisci facilis numquam ea voluptates. Debitis excepturi
						provident sequi doloremque aliquid eligendi est quae, ad esse autem
						architecto vitae? Mollitia est consectetur incidunt, perspiciatis
						ducimus unde, numquam facilis, labore veniam ex ipsa modi eligendi.
						Fugiat velit dicta exercitationem, ea molestiae voluptatum aut
						temporibus ipsum sit iure. Deleniti, amet obcaecati. Id illum iusto,
						pariatur totam facilis voluptatem ipsam earum optio perferendis
						asperiores eius rerum libero quas officia quam sunt iure voluptates
						praesentium ipsa blanditiis! Cupiditate, accusantium minima ratione
						ullam debitis atque unde iusto neque distinctio necessitatibus optio
						rem dolorum ad eos animi hic magni non assumenda corrupti quisquam
						ex nobis veniam laborum error. Quod aperiam alias ex, facilis quasi,
						autem impedit fugiat molestias deleniti vero omnis voluptatem
						laborum vel, eligendi architecto reprehenderit velit nihil. Magnam
						quod quia tempore dicta, officia eos odit consequatur, repellendus
						animi nam accusantium illum sed atque, quidem voluptatum architecto
						quas aspernatur porro quo tenetur earum. Asperiores, consectetur
						quasi.
					</p>
				</div>
				<div className="post__comments">
					<div className="post__comments__form">
						<h1>Comment form here</h1>
						<input type="text" name="" id="" />
					</div>
					<ul className="post__comments__list">
						<li className="post__comments__list__comment">comment</li>
						<li className="post__comments__list__comment">comment</li>
						<li className="post__comments__list__comment">comment</li>
						<li className="post__comments__list__comment">comment</li>
						<li className="post__comments__list__comment">comment</li>
					</ul>
				</div>
			</div>
		</>
	);
}
