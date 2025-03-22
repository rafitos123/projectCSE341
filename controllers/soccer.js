const e = require('express');
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('soccer').find();
        const soccer = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(soccer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getSingle = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('soccer').find({_id: playerId});
        result.toArray().then((soccer) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(soccer[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
 
};

const createPlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const player = {
            Name: req.body.Name,
            Position: req.body.Position,
            Club: req.body.Club,
            height: req.body.height,
        };

        const response = await mongodb.getDatabase().collection('soccer').insertOne(player);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Player created successfully', playerId: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the player', details: error.message });
    }
};

const updatePlayer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const playerId = new ObjectId(req.params.id);
        const player = {
            Name: req.body.Name,
            Position: req.body.Position,
            Club: req.body.Club,
            height: req.body.height,
        };

        const response = await mongodb.getDatabase().collection('soccer').replaceOne({ _id: playerId }, player);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Player updated successfully' });
        } else {
            return res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the player', details: error.message });
    }
};

const deletePlayer = async (req, res) => {

    try {
        const playerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('soccer').deleteOne({_id: playerId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Player not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the player', details: error.message });
    }
 
};

module.exports = {
    getAll,
    getSingle,
    createPlayer,
    updatePlayer,
    deletePlayer
}