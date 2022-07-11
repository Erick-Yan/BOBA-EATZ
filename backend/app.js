const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");

// Import the routes.
const shopsRoutes = require("./routes/shops-routes");
const drinksRoutes = require("./routes/drinks-routes");

const app = express();

// Parse incoming request as JSON data.
app.use(bodyParser.json());

// Attach headers to response to connect backend to frontend.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// Handle API calls through routes below.
app.use('/api/shops', shopsRoutes);
app.use('/api/drinks', drinksRoutes);

// Below middleware function will handle requests that weren't handled 
// by the middleware above (better error handling in Postman).
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// Below middleware function will execute if any middlewares above it 
// result in an error.
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    // Set the status. If an error code exists, set it to that or 500.
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred."});
});

// Connect to MongDB database and start backend.
mongoose
    .connect('mongodb+srv://Erick:2w4r6y8i@cluster0.hvenj.mongodb.net/boba?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected!")
        // If connection is made to MongoDB database, start the backend server.
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });