const express = require('express');

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Feedback API',
        description: 'API to manage users reviews.',
    },

    host: 'feedback-4i2y.onrender.com',
    schemes: ['https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc);