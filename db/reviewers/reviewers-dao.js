const model = require('./reviewers-model');

const findReviewerById = (id) =>
    model.findById(id);

const createReviewer = (reviewer) =>
    model.create(reviewer);

const deleteReviewer = (id) =>
    model.deleteOne({_id: id});

const updateReviewer = (id, updatedReviewer) =>
    model.updateOne({_id: id},
                    {$set: updatedReviewer});

const updateReviewerReviews = (id, newReviewID) =>
    model.updateOne({_id: id}, {$push: {reviews: newReviewID}});

const updateReviewerToDoList = (id, newEventID) =>
    model.updateOne({_id: id}, {$push: {eventsToDoList: newEventID}});

module.exports = {
    findReviewerById, createReviewer, deleteReviewer, updateReviewer,
    updateReviewerReviews, updateReviewerToDoList
};