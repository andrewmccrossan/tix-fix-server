const sellersDao = require('../db/sellers/sellers-dao');
const usersDao = require('../db/users/users-dao');

module.exports = async (app) => {

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

    const getSellerInfo = (req, res) => {
        const sellerID = req.session['profile']._id.toString();
        sellersDao.findSellerById(sellerID)
            .then(info => res.json(info));
    };

    async function getEventSellers(req, res) {
        const eventID = req.params['eventId'];
        let eventSellersInfo = [];
        let eventSellers = await sellersDao.findSellersByEventID(eventID);
        await Promise.all(eventSellers.map(async (eventSeller) => {
            let seller = await usersDao.findUserById(eventSeller._id);
            const sellerObj = {
                sellerUsername: "",
                ticketQuantity: "",
                ticketPrice: ""
            };
            sellerObj.sellerUsername = seller.username;
            let ticket = await sellersDao.findTicketInfoBySellerAndEventID(eventSeller._id, eventID);
            sellerObj.ticketPrice = ticket[0].eventsSelling[0].price;
            sellerObj.ticketQuantity = ticket[0].eventsSelling[0].qty;
            eventSellersInfo.push(sellerObj);
        }));
        res.json(eventSellersInfo);
    }

    const getSellerInfoById = (req, res) => {
        const sellerID = req.params['sellerID'];
        sellersDao.findSellerById(sellerID)
            .then(info => res.json(info));
    };

    app.post('/sell/tickets', addToSellerEventsSelling);
    app.post('/sell/watchlist', addToSellerWatchList);
    app.get('/sell/seller', getSellerInfo);
    app.get('/sell/sellers/:eventId', getEventSellers)
    app.get('/sell/:sellerID', getSellerInfoById);
}
