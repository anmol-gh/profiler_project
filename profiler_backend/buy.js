async function buyCheck(username) {
    const x = fetch(`https://www.buymeacoffee.com/${username}`)
    const status = (await x).status;
    return status;
};

export default buyCheck;
