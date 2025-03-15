const express = require('express');

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'users Api',
        description: 'users Api',
    },

    host: 'localhost:3000',
    schemes: ['http', 'https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc);