async function calendlyCheck(username) {
    const x = fetch(`https://calendly.com/${username}`)
    const status = (await x).status;
    return status;
};

export default calendlyCheck;
