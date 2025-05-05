async function quoraCheck(username) {
    const x = fetch(`https://quora.com/profile/${username}`)
    const status = (await x).status;
    return status;
};

export default quoraCheck;
