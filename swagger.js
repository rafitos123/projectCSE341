const express = require('express');

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Feedback API',
        description: 'API to manage users reviews.',
    },

    host: 'localhost:3002',
    schemes: ['http', 'https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc);