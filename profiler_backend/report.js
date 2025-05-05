import puppeteer from "puppeteer"

async function report(username) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto(`https://www.github.com/${username}`, {
            waitUntil: "load",
        });
        console.log("On: " + page.url());

        //Function to get details from Github

        var selector = 'body > div.logged-out.env-production.page-responsive.page-profile > div.application-main > main > div.mt-4.position-sticky.top-0.d-none.d-md-block.color-bg-default.width-full.border-bottom.color-border-muted > div > div > div.Layout-main > div > nav > a:nth-child(2) > span';

        // Wait for the specific span to appear in the DOM
        await page.waitForSelector(selector);

        // Get the text content of the span
        var repositories = await page.$eval(selector, el => el.textContent.trim());

        var selector = "body > div.logged-out.env-production.page-responsive.page-profile > div.application-main > main > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span"
        var followersGithub = await page.$eval(selector, el => el.textContent.trim());

        var selector = "body > div.logged-out.env-production.page-responsive.page-profile > div.application-main > main > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(2) > span"
        var followingGithub = await page.$eval(selector, el => el.textContent.trim());

        await page.goto(`https://www.instagram.com/${username}`, {
            waitUntil: "load",
        });
        console.log("On: " + page.url());

        const xpath = '//*[@id="mount_0_0_Bd"]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span/span';
        await page.waitForXPath(xpath);
        const [element] = await page.$x(xpath);
        const followerInstagram = await page.evaluate(el => el.textContent.trim(), element);

        // var followersInstagram = await page.$eval(selector, el => el.textContent.trim());


        var details = {
            "followersGithub": followersGithub,
            "repositories": repositories,
            "followingGithub": followingGithub,
            "followerInstagram": followerInstagram,
            "followingInstagram": followersGithub
        }


        return details;
    } catch (error) {
        return (error)
    }

};

export default report;
