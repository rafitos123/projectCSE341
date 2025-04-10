const { body, param } = require('express-validator');

const validateUser = [
    body('firstName')
        .notEmpty().withMessage('First Name is required')
        .isString().withMessage('Name must be a string'),

    body('lastName')
        .notEmpty().withMessage('Last Name is required')
        .isString().withMessage('Last Name must be a string'),

    body('email')
        .notEmpty().withMessage('email is required')
        .isString().withMessage('email must be a string'),

];

const validateUserId = [
    param('id')
        .isMongoId().withMessage('Invalid player ID'),
];

const validateProduct = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isString().withMessage('Price must be a string'),
    
    body('average_rating')
        .notEmpty().withMessage('Average rating is required')
        .isNumeric().withMessage('Average rating must be a number')
        .isFloat({ min: 0, max: 5 }).withMessage('Average rating must be between 0 and 5'),
];

const validateProductId = [
    param('id')
        .isMongoId().withMessage('Invalid player ID'),
];

const validateReview = [
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid user ID'),

    body('productId')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID'),

    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number')
        .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),

    body('comment')
        .notEmpty().withMessage('Comment is required')
        .isString().withMessage('Comment must be a string'),

    body('verified')
        .optional()
        .isBoolean().withMessage('Verified must be a boolean'),
    
    body('verified_date')
        .optional()
        .isDate().withMessage('Verified date must be a valid date'),


];

const validateReviewId = [
    param('id')
        .isMongoId().withMessage('Invalid player ID'),
];


module.exports = { validateUser, validateUserId, validateReview, validateReviewId, validateProduct, validateProductId };
