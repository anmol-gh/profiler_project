import "./Search.css";
import { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

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
	const [repositories, setRepositories] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(0);
	const handleClicks = async (event) => {
		const followersDiv = document.getElementById("followers");
		const followingDiv = document.getElementById("following");
		const repositoriesDiv = document.getElementById("repositories");
		const followersSpan = document.getElementById("spanFollowers");
		const followingSpan = document.getElementById("spanFollowing");
		const repositoriesSpan = document.getElementById("spanRepositories");
		try {
			const data = await axios.post("http://localhost:6431/report", {
				username: username,
			});
			followersDiv.innerHTML = data.data.followersGithub;
			followingDiv.innerHTML = data.data.followingGithub;
			repositoriesDiv.innerHTML = data.data.repositories;
			console.log(followers, Number(data.data.followersGithub));
			// Sign for Followers
			if (followers > Number(data.data.followersGithub)) {
				followersSpan.innerHTML = "✅";
			} else {
				followersSpan.innerHTML = "❌";
			}
			// Sign for Following
			if (following > Number(data.data.followingGithub)) {
				followingSpan.innerHTML = "✅";
			} else {
				followingSpan.innerHTML = "❌";
			}
			// Sign for Repositories
			if (repositories > Number(data.data.repositories)) {
				repositoriesSpan.innerHTML = "✅";
			} else {
				repositoriesSpan.innerHTML = "❌";
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRepositories = (event) => {
		setRepositories(event.target.value);
	};
	const handleFollowers = (event) => {
		setFollowers(event.target.value);
	};
	const handleFollowing = (event) => {
		setFollowing(event.target.value);
	};
	// button to save the report

	const saveReport = () => {
		window.print();
	}

	return (
		<>
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
			<Layout />
			<>
				<div className='reportSections'>
					<p className='description'> Enter details that you wish to check</p>
					<label className='reportText'>Repositories</label>
					<input
						type='number'
						className='reportInput repositories'
						onChange={handleRepositories}
						min='0'
					/>
					<label className='reportText'>Followers</label>
					<input
						type='number'
						className='reportInput followers'
						onChange={handleFollowers}
						min='0'
					/>
					<label className='reportText'>Following</label>
					<input
						type='number'
						className='reportInput following'
						onChange={handleFollowing}
						min='0'
					/>
					<button className='report-btn' onClick={handleClicks}>
						Generate Report
					</button>
					<div className='reportText'>
						User Repositories
						<div
							className='reportText details repositories'
							id='repositories'
						></div>
						<span id='spanRepositories'></span>
					</div>
					<div className='reportText'>
						User Followers
						<div className='reportText details followers' id='followers'></div>
						<span id='spanFollowers'></span>
					</div>
					<div className='reportText'>
						User Following
						<div className='reportText details following' id='following'></div>
						<span id='spanFollowing'></span>
					</div>
					<button className='report-btn' onClick = {saveReport}> Save Report</button>
				</div>
			</>
		</>
	);
};

export default Search;
