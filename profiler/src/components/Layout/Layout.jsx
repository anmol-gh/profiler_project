import { useState } from "react";
import "./Layout.css";

const profile_report = () => {
	console.log("hi");
};

const Layout = () => {
	return (
		<>
			<section className='main-section'>
				<div className='main-section-child'>
					<div id='Instagram' className='company'>
						Instagram
					</div>
					<div id='Github' className='company '>
						Github
					</div>
				</div>
				<div className='main-section-child'>
					{/* <div id='Github-report' className='company'> */}
					{/* </div> */}
					<button className='company' onClick={profile_report}>
						Profile Report
					</button>
					{/* <div id='Instagram-report' className='company'>
						Profile Report
					</div> */}
					<button className='company' onClick={profile_report}>
						Profile Report
					</button>
				</div>
			</section>
		</>
	);
};

export default Layout;
