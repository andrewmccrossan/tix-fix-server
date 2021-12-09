const sellersDao = require('../db/sellers/sellers-dao');

module.exports = (app) => {

    const addToSellerEventsSelling = (req, res) => {
        const newTickets = req.body;
        const sellerID = req.session['profile']._id.toString();
        sellersDao.updateSellerEventsSelling(sellerID, newTickets)
            .then((status) => res.json(status))
    };

    const addToSellerWatchList = (req, res) => {
        const eventID = req.body.eventID;
        const sellerID = req.session['profile']._id.toString();
        sellersDao.updateSellerEventsWatchlist(sellerID, eventID)
            .then((status) => res.json(status))
    };

    const sellerInfo = (req, res) => {
        const sellerID = req.session['profile']._id.toString();
        console.log(sellerID);
        sellersDao.findSellerById(sellerID)
            .then(info => {res.json(info); console.log(info)});
    };

    app.post('/sell/tickets', addToSellerEventsSelling);
    app.post('/sell/watchlist', addToSellerWatchList);
    app.get('/sell/seller', sellerInfo);
}
