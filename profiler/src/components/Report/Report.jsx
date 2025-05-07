import React from "react";
import "./Report.css";
import { useState } from "react";
import axios from "axios";

const Report = () => {
	const [repositories, setRepositories] = useState(0);
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(0);
	const handleClick = async (event) => {
		console.log(repositories, followers, following);
		try {
			axios.post("http://localhost:6431/report", {
				username: "anmol-gh",
			});
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

	return (
		<>
			<div className='reportSections'>
				<p> Enter details that you wish to check</p>
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
			</div>
			<button className='report-btn' onClick={handleClick}>
				Generate Report
			</button>
			<div className='reportSections'></div>
			<div className='reportText'>Repositories</div>
			<div className='reportText'> Followers </div>
			<div className='reportText'> Following </div>
		</>
	);
};

export default Report;
