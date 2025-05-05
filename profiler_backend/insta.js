import puppeteer from "puppeteer"

async function instaCheck(username) {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Navigate the page to a URL
		await page.goto(`https://www.instagram.com/${username}`, {
			waitUntil: "load",
		});
		console.log("On: " + page.url());

		//Function to check availability
		const span = await page.$$("span");
		if (span.length > 1) {
			await browser.close();
			console.log("Available");
			return ("Available");
		} else {
			await browser.close();
			console.log("Unavailable");
			return ("Unavailable");
		}
	} catch (error) {
		return ("Unavailable")
	}
	// Launch the browser and open a new blank page

};

export default instaCheck;
