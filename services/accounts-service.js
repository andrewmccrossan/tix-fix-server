const dao = require('../db/accounts/accounts-dao')

module.exports = (app) => {

    const findAllAccounts = (req, res) =>
        dao.findAllMovies()
            .then(movies => res.json(movies));

    const deleteAccount = (req, res) =>
        dao.deleteMovie(req.params.id)
            .then((status) => res.send(status));

    const createAccount = (req, res) =>
        dao.createMovie(req.body)
            .then((insertedMovie) => res.json(insertedMovie));

    const findAccountById = (req, res) =>
        dao.findMovieById(req.params.id)
            .then(movie => res.json(movie));

    const updateAccount = (req, res) =>
        dao.updateMovie(req.params.id, req.body)
            .then(status => res.send(status));

    app.get("/rest/accounts", findAllAccounts);
    app.delete("/rest/accounts/:id", deleteAccount);
    app.post("/rest/accounts", createAccount);
    app.get("/rest/accounts/:id", findAccountById);
    app.put("/rest/accounts/:id", updateAccount);
}
