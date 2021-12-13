const transactionDao = require('../db/transactions/transactions-dao');

module.exports = (app) => {

    const buyerAllTransactions = (req, res) => {
        const buyerId = req.session['profile']._id.toString();
        transactionDao.findAllBuyerTransactions(buyerId)
            .then(info => res.json(info));
    };

    app.get('/transactions/buyer', buyerAllTransactions);
}
