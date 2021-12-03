const usersDao = require('../db/users/users-dao');

module.exports = (app) => {
    const setSession = (req, res) => {
        const name = req.params['name'];
        req.session[name] = req.params['value'];
        res.send(req.session);
    }

    const getSession = (req, res) => {
        const name = req.params['name'];
        res.send(req.session[name]);
    }

    const getSessionAll = (req, res) => {
        res.send(req.session);
    }
    const resetSession = (req, res) => {
        req.session.destroy();
        res.send(200);
    }

    app.get('/api/session/set/:name/:value', setSession);
    app.get('/api/session/get/:name', getSession);
    app.get('/api/session/get', getSessionAll);
    app.get('/api/session/reset', resetSession);


    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        usersDao.findUserByCredentials(username, password)
            .then(user => {
                if(user) {
                    req.session['profile'] = user;
                    res.json(user);
                } else {
                    res.sendStatus(403);
                }})
    };

    const register = (req, res) => {
        const newUser = req.body;
        usersDao.createUser(newUser)
            .then(actualUser => {
                req.session['profile'] = actualUser;
                res.json(actualUser);
            })
    };

    const profile = (req, res) =>
        res.json(req.session['profile']);

    const logout = (req, res) => {
        req.session.destroy();
        res.send(200);
    };

    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/profile', profile);
    app.post('/api/logout', logout);
}
