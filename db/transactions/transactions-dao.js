const model = require('./transactions-model');

const findTransactionById = (id) =>
    model.findById(id);

const createTransaction = (transaction) =>
    model.create(transaction);

const deleteTransaction = (id) =>
    model.deleteOne({_id: id});

const updateTransaction = (id, updatedTransaction) =>
    model.updateOne({_id: id},
                    {$set: updatedTransaction});

module.exports = {
    findTransactionById, createTransaction, deleteTransaction, updateTransaction
};