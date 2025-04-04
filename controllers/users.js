const e = require('express');
const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getSingle = async (req, res) => {
    try {
        const usersId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').find({_id: usersId});
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
 
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const usersInf = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        const response = await mongodb.getDatabase().collection('users').insertOne(usersInf);
        if (response.acknowledged) {
            return res.status(201).json({ message: 'User created successfully', clubId: response.insertedId });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the user', details: error.message });
    }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const usersId = new ObjectId(req.params.id);
        const usersInf = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };

        const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: usersId }, usersInf);
        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: ' User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the player', details: error.message });
    }
};

const deleteUser = async (req, res) => {

    try {
        const usersId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('users').deleteOne({_id: usersId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user', details: error.message });
    }
 
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}


