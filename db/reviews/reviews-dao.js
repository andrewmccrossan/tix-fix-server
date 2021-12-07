const model = require('./reviews-model');

const findReviewById = (id) =>
    model.findById(id);

const createReview = (review) =>
    model.create(review);

const deleteReview = (id) =>
    model.deleteOne({_id: id});

const updateReview = (id, updatedReview) =>
    model.updateOne({_id: id},
                    {$set: updatedReview});

module.exports = {
    findReviewById, createReview, deleteReview, updateReview
};