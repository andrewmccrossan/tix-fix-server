const sellersDao = require('../db/sellers/sellers-dao');

module.exports = (app) => {

    const addToSellerEventsSelling = (req, res) => {
        const newTickets = req.body;
        const seller = req.session['profile']._id.toString();
        sellersDao.updateSellerEventsSelling(seller, newTickets)
            .then((status) => res.json(status))
    };

    app.post('/sell', addToSellerEventsSelling);
}
