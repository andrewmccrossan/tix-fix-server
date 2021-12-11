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

const findBuyerTransaction = (buyerId, eventId) => {
    return model.findOne({buyerID:buyerId, eventID: eventId})
}

const findAllBuyerTransactions = (buyerId) => {
    return model.find({buyerID:buyerId})
}


module.exports = {
    findTransactionById, createTransaction, deleteTransaction, updateTransaction, findBuyerTransaction, findAllBuyerTransactions
};