const model = require('./buyers-model');

const findBuyerById = (id) =>
    model.findById(id);

const createBuyer = (buyer) =>
    model.create(buyer);

const deleteBuyer = (id) =>
    model.deleteOne({_id: id});

const updateBuyer = (id, updatedBuyer) =>
    model.updateOne({_id: id},
                    {$set: updatedBuyer});

const updateBuyerEventsBought = (id, newEventID) =>
    model.updateOne({_id: id}, {$push: {eventsBought: newEventID}});


const updateBuyerEventsWishlist = (id, newEventID) =>
    model.updateOne({_id: id}, {$push: {eventsWishlist: newEventID}});

const deleteBuyerEventFromWishList = (id, eventID) =>
    model.updateOne({_id: id}, {$pull: {eventsWishlist: eventID}});


module.exports = {
    findBuyerById, createBuyer, deleteBuyer, updateBuyer, updateBuyerEventsBought,
    updateBuyerEventsWishlist, deleteBuyerEventFromWishList
};