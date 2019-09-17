const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    isEmpty,
    verifyToken
}