const sellersDao = require('../db/sellers/sellers-dao');

module.exports = (app) => {

    const getSellerByID = (req, res) => {
        sellersDao.findSellerById(req.params.sellerID)
            .then(seller => {
                if(seller) {
                    res.json(seller);
                } else {
                    res.sendStatus(400);
                }})
    };

    app.get('/api/sellers/:sellerID', getSellerByID);
}
