const e = require('express');
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('reviews').find();
        const review = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getSingle = async (req, res) => {
    try {
        const reviewsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('reviews').find({_id: reviewsId});
        result.toArray().then((reviews) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(reviews[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
 
};

const createReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const review = {
           user_id: new ObjectId(req.body.userId),
           product_id: new ObjectId(req.body.productId),
           rating: req.body.rating,
           comment: req.body.comment,
           verified: req.body.verified,
           verified_date: req.body.verified_date,
        };

        const response = await mongodb.getDatabase().collection('reviews').insertOne(review);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'review created successfully', reviewsId: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the player', details: error.message });
    }
};

const updateReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const reviewsId = new ObjectId(req.params.id);
        const review = {
            user_id: new ObjectId(req.body.userId),
            product_id: new ObjectId(req.body.productId),
            rating: req.body.rating,
            comment: req.body.comment,
            verified: req.body.verified,
            verified_date: req.body.verified_date,
        };

        const response = await mongodb.getDatabase().collection('reviews').replaceOne({ _id: reviewsId }, review);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'review updated successfully' });
        } else {
            return res.status(404).json({ error: 'review not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the player', details: error.message });
    }
};

const deleteReview = async (req, res) => {

    try {
        const reviewsId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('reviews').deleteOne({_id: reviewsId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'review not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the review', details: error.message });
    }
 
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
}