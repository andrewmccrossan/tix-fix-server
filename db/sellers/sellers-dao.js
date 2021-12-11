const model = require('./sellers-model');

const findSellerById = (id) =>
    model.findById(id);

const createSeller = (seller) =>
    model.create(seller);

const deleteSeller = (id) =>
    model.deleteOne({_id: id});

const updateSeller = (id, updatedSeller) =>
    model.updateOne({_id: id},
                    {$set: updatedSeller});

const updateSellerEventsSelling = (id, newTickets) =>
    model.updateOne({_id: id}, {$push: {eventsSelling: newTickets}});

const updateSellerEventsWatchlist = (id, newEventID) =>
    model.updateOne({_id: id}, {$push: {eventsWatchlist: newEventID}});

const findSellersByEventID = (eventID) =>
    model.find({eventsSelling: {$elemMatch: {eventID: eventID}}}, {_id: 1});

const findTicketInfoBySellerAndEventID = (sellerID, eventID) =>
    model.find({_id: sellerID}, {eventsSelling: {$elemMatch: {eventID: eventID}}});

const findReviewsForSeller = (sellerID) =>
    model.find({_id: sellerID}, {reviews: 1});

const deleteSellerEventFromWatchList = (id, eventID) =>
    model.updateOne({_id: id}, {$pull: {eventsWatchlist: eventID}});


const deleteSellerEventFromSellingList = (id, ticketId) =>
    model.updateOne({_id: id}, {$pull: {eventsSelling: {_id: ticketId}}});

module.exports = {
    findSellerById, createSeller, deleteSeller, updateSeller, findSellersByEventID,
    findTicketInfoBySellerAndEventID, updateSellerEventsSelling, updateSellerEventsWatchlist,
    findReviewsForSeller, deleteSellerEventFromWatchList, deleteSellerEventFromSellingList
};