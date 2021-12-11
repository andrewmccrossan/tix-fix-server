const buyersDao = require('../db/buyers/buyers-dao');
const transactionDao = require('../db/transactions/transactions-dao');

module.exports = (app) => {

    const addToBuyerEventsBought = (req, res) => {
        const purchaseDetails = req.body
        const buyerId = req.session['profile']._id.toString();
        buyersDao.updateBuyerEventsBought(buyerId, purchaseDetails.eventID)
            .then(transactionDao.createTransaction({
                buyerID: buyerId,
                sellerID: "TIX_FIX",
                eventID: purchaseDetails.eventID,
                price: purchaseDetails.price,
                qty: purchaseDetails.qty,
            })).then((status) => res.json(status))
    };

    const addToBuyWishList = (req, res) => {
        const eventID = req.body.eventID;
        const buyerID = req.session['profile']._id.toString();
        buyersDao.updateBuyerEventsWishlist(buyerID, eventID)
            .then((status) => res.json(status))
    };

    const buyerInfo = (req, res) => {
        const buyerId = req.session['profile']._id.toString();
        buyersDao.findBuyerById(buyerId)
            .then(info => res.json(info));
    };

    const buyerInfoById = (req, res) => {

        const buyerId = req.params['buyerID'];

        buyersDao.findBuyerById(buyerId)
            .then(info => res.json(info));
    };

    const buyerEventTransaction = (req, res) => {

        const buyerId = req.session['profile']._id.toString();
        const eventId = req.params['eventId'].toString();
        transactionDao.findBuyerTransaction(buyerId, eventId).then(info => res.json(info));
    };

    const deleteBuyerEventFromWishList = (req, res) => {
        const buyerId = req.session['profile']._id.toString();
        const eventId = req.params['eventId'].toString();
        buyersDao.deleteBuyerEventFromWishList(buyerId, eventId)
            .then((status) => res.json(status))
    }

    app.post('/buy/tickets', addToBuyerEventsBought);
    app.get('/buy/buyer', buyerInfo);
    app.get('/buy/:buyerID', buyerInfoById);
    app.get('/buy/details/:eventId', buyerEventTransaction);
    app.post('/buy/watchlist', addToBuyWishList);
    app.post('/buy/wishlist/:eventId', deleteBuyerEventFromWishList)

}