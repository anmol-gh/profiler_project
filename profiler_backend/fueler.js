async function fuelerCheck(username) {
	const x = fetch(`https://www.fueler.io/${username}`)
	const status = (await x).status;
	return status;
};

export default fuelerCheck;
