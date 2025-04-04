const e = require('express');
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('products').find();
        const product = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getSingle = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('products').find({_id: productId});
        result.toArray().then((products) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(products[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
 
};

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            average_rating: req.body.average_rating,
        };

        const response = await mongodb.getDatabase().collection('products').insertOne(product);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Product created successfully', productId: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the player', details: error.message });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            average_rating: req.body.average_rating,
        };

        const response = await mongodb.getDatabase().collection('products').replaceOne({ _id: productId }, product);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Product updated successfully' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the player', details: error.message });
    }
};

const deleteProduct = async (req, res) => {

    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('products').deleteOne({_id: productId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the product', details: error.message });
    }
 
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
}