const reviewersDao = require('../db/reviewers/reviewers-dao');
const reviewsDao = require('../db/reviews/reviews-dao');
const usersDao = require('../db/users/users-dao');

const axios = require('axios');

const SEATGEEK_CLIENT_ID = process.env.SEATGEEK_CLIENT_ID || 'MjQ1OTcxNTl8MTYzNzcxOTI2MC4yNzYwMTM';
const SEATGEEK_CLIENT_SECRET = process.env.SEATGEEK_CLIENT_SECRET || '3218bfa9ff53979b799a09b011e3cc1339194e7f03c8d8caefcd6cdf2177724c';

module.exports = (app) => {

    const postVenueReview = (req, res) => {
        const score = req.body.score;
        const text = req.body.text;
        const date = req.body.date;
        const eventID = req.params.eventID;
        axios.get(`https://api.seatgeek.com/2/events/${eventID}?client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`)
            .then((response) => {
                const venueID = response.data.venue.id;
                reviewsDao.createReview({
                    reviewerID: req.session['profile']._id.toString(),
                    revieweeType: 'VENUE',
                    revieweeID: venueID,
                    text: text,
                    score: score,
                    date: date,
                })
                    .then(review => {
                        if(review) {
                            reviewersDao.updateReviewerReviews(req.session['profile']._id.toString(), review._id)
                                .then(() => res.sendStatus(200))
                        } else {
                            res.sendStatus(400);
                        }})
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(400);
            })
    };

    async function getReviewsFromReviewerID (req, res) {
        let reviewInfos = [];
        let something = await reviewersDao.findReviewsByReviewerID(req.params.userID);
        await Promise.all(something.reviews.map(async (reviewID) => {
            let review = await reviewsDao.findReviewById(reviewID);
            if (review.revieweeType === 'SELLER') {
                let user = await usersDao.findUserById(review.revieweeID);
                const reviewObj = {
                    revieweeName: '',
                    score: '',
                    text: '',
                    revieweeType: '',
                };
                reviewObj.revieweeName = user.username;
                reviewObj.score = review.score;
                reviewObj.text = review.text;
                reviewObj.revieweeType = review.revieweeType;
                reviewInfos.push(reviewObj);
            } else {
                // TODO - handle venue reviews
            }
        }));
        res.json(reviewInfos);
    };

    app.post('/api/reviews/events/:eventID', postVenueReview);
    app.get('/api/reviews/reviewers/:userID', getReviewsFromReviewerID)
}
