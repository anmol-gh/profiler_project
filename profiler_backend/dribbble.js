async function dribbbleCheck(username) {
    const x = fetch(`https://dribbble.com/${username}`)
    const status = (await x).status;
    return status;
};

export default dribbbleCheck;
