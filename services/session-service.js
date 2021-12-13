const usersDao = require('../db/users/users-dao');
const sellersDao = require('../db/sellers/sellers-dao');
const buyersDao = require('../db/buyers/buyers-dao');
const reviewersDao = require('../db/reviewers/reviewers-dao');

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
        res.sendStatus(200);
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
                if(user.length > 0) {
                    req.session['profile'] = user[0];
                    res.json(user);
                } else {
                    res.sendStatus(403);
                }})
    };

    const editProfile = (req, res) => {
        const id = req.body._id
        const user = req.body
        const userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            zip: user.zip
        }
        usersDao.updateUserDetails(id,userInfo)
            .then(() => usersDao.findUserById(id)
                .then(newUser => {req.session['profile'] = newUser}))
            .then(() => res.sendStatus(200))
    }

    const register = (req, res) => {
        const newUser = req.body;
        usersDao.findUserByUsername(newUser.username)
            .then(user => {
                if (user.length > 0) {
                    res.sendStatus(400);
                } else {
                    let registeredUser;
                    usersDao.createUser(newUser)
                        .then(actualUser => {
                            registeredUser = actualUser;
                            req.session['profile'] = actualUser;
                        })
                        .then(() => {
                            switch (newUser.role) {
                                case 'BUYER':
                                    buyersDao.createBuyer({
                                                              _id: registeredUser._id.toString(),
                                                              eventsBought: [],
                                                              eventsWishlist: [],
                                                          })
                                        .then(() => res.json(registeredUser));
                                    break;
                                case 'SELLER':
                                    sellersDao.createSeller({
                                                              _id: registeredUser._id.toString(),
                                                              eventsSelling: [],
                                                              eventsWatchlist: [],
                                                          })
                                        .then(() => res.json(registeredUser));
                                    break;
                                case 'REVIEWER':
                                    reviewersDao.createReviewer({
                                                                _id: registeredUser._id.toString(),
                                                                reviews: [],
                                                                eventsToDoList: [],
                                                            })
                                        .then(() => res.json(registeredUser));
                                    break;
                                default:
                                    throw new Error('Invalid role was given.');
                            }
                        })
                }})
    };

    const profile = (req, res) => {
        if (req.session['profile']){
            res.json(req.session['profile']);
        }
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const userByUsername = (req, res) => {
        usersDao.findUserByUsername(req.params.username)
            .then(user => {
                if (user.length > 0) {
                    res.json(user[0]);
                } else {
                    res.sendStatus(400);
                }
            })
    };

    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/profile', profile);
    app.post('/api/edit-profile', editProfile);
    app.post('/api/logout', logout);
    app.get('/api/users/:username', userByUsername);
}
