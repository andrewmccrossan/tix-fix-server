const model = require('./events-model');

const findEventById = (id) =>
    model.findById(id);

const createEvent = (event) =>
    model.create(event);

const deleteEvent = (id) =>
    model.deleteOne({_id: id});

const updateEvent = (id, updatedEvent) =>
    model.updateOne({_id: id},
                    {$set: updatedEvent});

const updateEventBuyers = (id, newBuyerID) =>
    model.updateOne({_id: id}, {$push: {buyers: newBuyerID}});

const updateEventSellers = (id, newSellerID) =>
    model.updateOne({_id: id}, {$push: {sellers: newSellerID}});

module.exports = {
    findEventById, createEvent, deleteEvent, updateEvent, updateEventBuyers, updateEventSellers
};