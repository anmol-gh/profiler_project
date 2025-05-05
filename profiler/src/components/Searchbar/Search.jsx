import "./Search.css";
import { useState } from "react";
import axios from "axios";

//to show when results are loading
const searching = (
	<div>
		<p className='paragraph'> Searching </p>
	</div>
);

const Search = () => {
	// useState for Input Field
	const [username, setUsername] = useState({ username: "" });

	// useState for Button
	const [update, setUpdate] = useState(username);

	// Function to handle Input Field
	const handleChange = (event) => {
		setUsername(event.target.value);
	};

	// Function to handle Button Click
	const handleClick = async (event) => {
		setUpdate(username);

		// the below snippet resets the appearance of the labels when button is clicked
		const unavailablePlatforms = document.getElementsByClassName("unavailable");
		const availablePlatforms = document.getElementsByClassName("available");
		const errorPlatforms = document.getElementsByClassName("error");
		// console.log(unavailablePlatforms);
		// console.log(availablePlatforms);

		for (let platform = 0; platform < unavailablePlatforms.length; platform++) {
			unavailablePlatforms[platform].className = "company";
		}

		for (let platform = 0; platform < availablePlatforms.length; platform++) {
			availablePlatforms[platform].className = "company";
		}
		for (let platform = 0; platform < errorPlatforms.length; platform++) {
			errorPlatforms[platform].className = "company";
		}

		/// API Requests to platforms that provide API

		//For Github
		async function Github() {
			const github = document.getElementById("Github");
			try {
				const githubAPI = fetch(`https://api.github.com/users/${username}`);
				const githubStatus = (await githubAPI).status;
				if (githubStatus === 200) {
					github.className = "company unavailable";
				} else if (githubStatus === 404) {
					github.className = "company available";
				} else {
					github.className = "company error";
				}
			} catch (error) {
				github.className = "company error";
			}
		}
		Github();

		//For Instagram
		async function Instagram() {
			const instagram = document.getElementById("Instagram");
			const InstagramLink = document.createElement("a");
			InstagramLink.href = `http://instagram.com/${username}`;
			InstagramLink.className = "anchor";
			InstagramLink.textContent = " ";
			instagram.appendChild(InstagramLink);

			try {
				const response = await axios.post("http://localhost:6431/insta", {
					username,
				});
				if (response.data === "Unavailable") {
					instagram.className = "company unavailable";
				} else if (response.data === "Available") {
					instagram.className = "company available";
				} else {
					instagram.className = "company error";
				}
			} catch (error) {
				instagram.className = "company error";
				console.log(error);
			}
		}
		Instagram();
	};

	return (
		<div className='search-panel'>
			<input
				type='text'
				placeholder='Username to search'
				className='username'
				username={username}
				onChange={handleChange}
				id='input'
			/>
			<button className='btn-availability' onClick={handleClick}>
				Check Availability
			</button>
		</div>
	);
};

export default Search;
