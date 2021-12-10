const reviewersDao = require('../db/reviewers/reviewers-dao');
const reviewsDao = require('../db/reviews/reviews-dao');
const usersDao = require('../db/users/users-dao');
const sellersDao = require('../db/sellers/sellers-dao');

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

    const postSellerReview = (req, res) => {
        const score = req.body.score;
        const text = req.body.text;
        const date = req.body.date;
        const sellerID = req.params.sellerID;
        reviewsDao.createReview({
            reviewerID: req.session['profile']._id.toString(),
            revieweeType: 'SELLER',
            revieweeID: sellerID,
            text: text,
            score: score,
            date: date,
        })
            .then(review => {
                if (review) {
                    reviewersDao.updateReviewerReviews(req.session['profile']._id.toString(), review._id)
                        .then(() => res.sendStatus(200))
                } else {
                    res.sendStatus(400);
                }})
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
                let venueInfo = await axios.get(`https://api.seatgeek.com/2/venues/${review.revieweeID}?client_id=${SEATGEEK_CLIENT_ID}&client_secret=${SEATGEEK_CLIENT_SECRET}`);
                const reviewObj = {
                    revieweeName: '',
                    score: '',
                    text: '',
                    revieweeType: '',
                };
                reviewObj.revieweeName = venueInfo.data.name;
                reviewObj.score = review.score;
                reviewObj.text = review.text;
                reviewObj.revieweeType = review.revieweeType;
                reviewInfos.push(reviewObj);
            }
        }));
        res.json(reviewInfos);
    };

    async function getReviewsFromSellerID (req, res) {
        let reviews = await reviewsDao.findReviewsForReviewee(req.params.sellerID);
        res.json(reviews);
    };

    async function getInformativeReviewsFromSellerID (req, res) {
        let reviewInfos = [];
        let reviews = await reviewsDao.findReviewsForReviewee(req.params.sellerID);
        await Promise.all(reviews.map(async (review) => {
            const reviewObj = {
                reviewerName: '',
                score: 1,
                text: '',
                revieweeType: '',
                reviewerID: '',
            };
            let reviewer = await usersDao.findUserById(review.reviewerID);
            reviewObj.reviewerName = reviewer.username;
            reviewObj.score = review.score;
            reviewObj.text = review.text;
            reviewObj.revieweeType = review.revieweeType;
            reviewObj.reviewerID = review.reviewerID;
            reviewInfos.push(reviewObj);
        }));
        res.json(reviewInfos);
    };

    async function getReviewsFromVenueID (req, res) {
        let reviewInfos = [];
        let reviews = await reviewsDao.findReviewsForReviewee(req.params.venueID);
        await Promise.all(reviews.map(async (review) => {
            const reviewObj = {
                reviewerName: '',
                score: 1,
                text: '',
                revieweeType: '',
                reviewerID: '',
            };
            let reviewer = await usersDao.findUserById(review.reviewerID);
            reviewObj.reviewerName = reviewer.username;
            reviewObj.score = review.score;
            reviewObj.text = review.text;
            reviewObj.revieweeType = review.revieweeType;
            reviewObj.reviewerID = review.reviewerID;
            reviewInfos.push(reviewObj);
        }));
        res.json(reviewInfos);
    };

    app.post('/api/reviews/sellers/:sellerID', postSellerReview);
    app.post('/api/reviews/events/:eventID', postVenueReview);
    app.get('/api/reviews/reviewers/:userID', getReviewsFromReviewerID);
    app.get('/api/reviews/sellers/:sellerID', getReviewsFromSellerID);
    app.get('/api/reviews/informativesellers/:sellerID', getInformativeReviewsFromSellerID);
    app.get('/api/reviews/venues/:venueID', getReviewsFromVenueID);
}
