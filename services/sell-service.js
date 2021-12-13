const sellersDao = require('../db/sellers/sellers-dao');
const usersDao = require('../db/users/users-dao');
const buyersDao = require('../db/buyers/buyers-dao');
const transactionsDao = require('../db/transactions/transactions-dao');

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
                sellerID: "",
                sellerUsername: "",
                ticketQuantity: "",
                ticketPrice: "",
                ticketSetID: ""
            };
            sellerObj.sellerUsername = seller.username;
            sellerObj.sellerID = eventSeller._id;
            let ticket = await sellersDao.findTicketInfoBySellerAndEventID(eventSeller._id, eventID);
            sellerObj.ticketPrice = ticket[0].eventsSelling[0].price;
            sellerObj.ticketQuantity = ticket[0].eventsSelling[0].qty;
            sellerObj.ticketSetID = ticket[0].eventsSelling[0]._id;
            eventSellersInfo.push(sellerObj);
        }));
        res.json(eventSellersInfo);
    }

    const getSellerInfoById = (req, res) => {
        const sellerID = req.params['sellerID'];
        sellersDao.findSellerById(sellerID)
            .then(info => res.json(info));
    };

    const deleteSellerEventFromWatchList = (req, res) => {
        const sellerId = req.session['profile']._id.toString();
        const eventId = req.params['eventId'].toString();
        sellersDao.deleteSellerEventFromWatchList(sellerId, eventId)
            .then((status) => res.json(status))
    }

    const deleteSellerEventFromSelling = (req, res) => {
        const sellerId = req.session['profile']._id.toString();
        const eventId = req.params['eventId'].toString();

        sellersDao.deleteSellerEventFromSellingList(sellerId, eventId)
            .then((status) => res.json(status))
    }

    let sellTicket = async (req, res) => {
        const eventSellerTicketInfo = req.body;
        const sellerID = eventSellerTicketInfo.sellerID;
        const ticketID = eventSellerTicketInfo.ticketSetID;
        const price = eventSellerTicketInfo.ticketPrice;
        const qty = eventSellerTicketInfo.ticketQuantity;
        const eventID = req.params.eventID;
        const buyerID = req.session['profile'];

        let addTixToEventsBought = await buyersDao.updateBuyerEventsBought(buyerID, eventID);
        let addNewTransaction = await transactionsDao.createTransaction({
            buyerID: buyerID,
            sellerID: sellerID,
            eventID: eventID,
            price: price,
            qty: qty,
                                                                        });
        let removeEventsSellingObject = await sellersDao.deleteSellerEventFromSellingList(sellerID, ticketID);
        res.sendStatus(200);
    }

    app.post('/sell/tickets', addToSellerEventsSelling);
    app.post('/sell/watchlist', addToSellerWatchList);
    app.get('/sell/seller', getSellerInfo);
    app.get('/sell/sellers/:eventId', getEventSellers);
    app.get('/sell/:sellerID', getSellerInfoById);
    app.post('/sell/delete/watchlist/:eventId', deleteSellerEventFromWatchList);
    app.post('/sell/delete/selling/:eventId', deleteSellerEventFromSelling);
    app.post('/sell/ticketSold/:eventID', sellTicket);
}
