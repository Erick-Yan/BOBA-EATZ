const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const path = require("path")

// Import the routes.
const shopsRoutes = require("./routes/shops-routes");
const drinksRoutes = require("./routes/drinks-routes");

const app = express();

const PORT = process.env.PORT || 5001

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

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Connect to MongDB database and start backend.
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://Erick:2w4r6y8i@cluster0.hvenj.mongodb.net/boba?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected!")
        // If connection is made to MongoDB database, start the backend server.
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });