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
    model.find({eventsSelling: {$elemMatch: {
        eventID: eventID
    }}}, {_id: 1});

findTicketInfoBySellerAndEventID = (sellerID, eventID) =>
    model.find({_id: sellerID}, {eventsSelling: {$elemMatch: {eventID: eventID}}});

module.exports = {
    findSellerById, createSeller, deleteSeller, updateSeller, findSellersByEventID,
    findTicketInfoBySellerAndEventID, updateSellerEventsSelling, updateSellerEventsWatchlist
};