const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const HttpError = require('./models/http-error');
const productRoutes = require('./routes/products/route')

const app = express();

app.use(bodyParser.json());

// CORS Header
// app.use(cors);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accepted, Authorization')
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/product', productRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not fond this route', 404);
    // throw error;
    next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Internal server error.'});
})


app.listen(5000, 'localhost'); // Start Node express server on 5000 PORT