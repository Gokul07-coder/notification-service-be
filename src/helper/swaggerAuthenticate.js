const auth = require('basic-auth');

const authenticate = (req, res, next) => {
    const user = auth(req);
    const USERNAME = 'Gokul';
    const PASSWORD = '';

    if (user && user.name === USERNAME && user.pass === PASSWORD) {
        return next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
    }
};

module.exports = authenticate;
