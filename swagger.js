const express = require('express');

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'players Api',
        description: 'players Api',
    },

    host: 'localhost:3000',
    schemes: ['http', 'https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc);