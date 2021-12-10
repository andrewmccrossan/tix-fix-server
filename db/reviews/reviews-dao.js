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

const findReviewsForSeller = (sellerID) =>
    model.find({revieweeID: sellerID});

module.exports = {
    findReviewById, createReview, deleteReview, updateReview, findReviewsForSeller
};