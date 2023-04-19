const { authenticateUser } = require('../utils/auth');
const { getUser } = require('../model/Login-RegisterDBOperations');

const LoginRoute = async function (req, res) {
    const { name, password } = req.body;
    console.log(name)
    console.log(password)
    if ((!name || name === '') && (!password || password === '')) {
        res.status(401).json({error: 'Missing username and password'});
        return;
    } else if (!name || name === '') {
        res.status(401).json({error: 'Missing username'});
        return;
    } else if (!password || password === '') {
        res.status(401).json({error: 'Missing password'});
        return;
    }

    const user = await getUser(name);
    
    if (!user) {
        res.status(401).json({error: 'User does not exist'});
        return;
    }

    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
        res.status(401).json({error: 'Password does not match our records'});
        return;
    }

    try {
        const token = authenticateUser(name);
        res.status(201).json({apptoken: token});
    } catch (err) {
        res.status(401).json({error: `${err.message}`});
    }
}

module.exports = LoginRoute;