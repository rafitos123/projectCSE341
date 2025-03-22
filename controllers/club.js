const e = require('express');
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

//handling erros

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('club').find();
        const soccer = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(soccer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getSingle = async (req, res) => {
    try {
        const clubId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('club').find({_id: clubId});
        result.toArray().then((club) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(club[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
 
};

const createClub = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const clubInf = {
            name: req.body.name,
            date: req.body.date,
        };

        const response = await mongodb.getDatabase().collection('club').insertOne(clubInf);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'Club created successfully', clubId: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the club', details: error.message });
    }
};

const updateClub = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const clubId = new ObjectId(req.params.id);
        const clubInf = {
            name: req.body.name,
            date: req.body.date,
        };

        const response = await mongodb.getDatabase().collection('club').replaceOne({ _id: clubId }, clubInf);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Club updated successfully' });
        } else {
            return res.status(404).json({ error: 'Club not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the player', details: error.message });
    }
};

const deleteClub = async (req, res) => {

    try {
        const clubId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('club').deleteOne({_id: clubId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'club not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the club', details: error.message });
    }
 
};

module.exports = {
    getAll,
    getSingle,
    createClub,
    updateClub,
    deleteClub
}


