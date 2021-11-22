const dao = require('../db/accounts/accounts-dao')

module.exports = (app) => {

    const findAllAccounts = (req, res) =>
        dao.findAllAccounts()
            .then(accounts => res.json(accounts));

    const deleteAccount = (req, res) =>
        dao.deleteAccount(req.params.id)
            .then((status) => res.send(status));

    const createAccount = (req, res) =>
        dao.createAccount(req.body)
            .then((insertedAccount) => res.json(insertedAccount));

    const findAccountById = (req, res) =>
        dao.findAccountById(req.params.id)
            .then(account => res.json(account));

    const updateAccount = (req, res) =>
        dao.updateAccount(req.params.id, req.body)
            .then(status => res.send(status));

    app.get("/rest/accounts", findAllAccounts);
    app.delete("/rest/accounts/:id", deleteAccount);
    app.post("/rest/accounts", createAccount);
    app.get("/rest/accounts/:id", findAccountById);
    app.put("/rest/accounts/:id", updateAccount);
}