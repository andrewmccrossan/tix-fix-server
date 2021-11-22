const model = require('./accounts-model');

const findAllAccounts = () =>
    model.find();

const findAccountById = (id) =>
    model.findById(id);

const createAccount = (account) =>
    model.create(account);

const deleteAccount = (id) =>
    model.deleteOne({_id: id});

const updateAccount = (id, updatedAccount) =>
    model.updateOne({_id: id},
                    {$set: updatedAccount});


module.exports = {
    findAllAccounts, findAccountById, createAccount, deleteAccount, updateAccount
};