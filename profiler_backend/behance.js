async function behanceCheck(username) {
    const x = fetch(`https://behance.net/${username}`)
    const status = (await x).status;
    return status;
};

export default behanceCheck;
