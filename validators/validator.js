const { body, param } = require('express-validator');

const validatePlayer = [
    body('Name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('Position')
        .notEmpty().withMessage('Position is required')
        .isString().withMessage('Position must be a string'),

    body('Club')
        .notEmpty().withMessage('Club is required')
        .isString().withMessage('Club must be a string'),

    body('height')
        .notEmpty().withMessage('Height is required')
        .isString().withMessage('Height must be a number with cm as unit'),
];

const validatePlayerId = [
    param('id')
        .isMongoId().withMessage('Invalid player ID'),
];

module.exports = { validatePlayer, validatePlayerId };
