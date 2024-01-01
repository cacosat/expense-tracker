import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import db from "../db/db.js"; // SQLite database instance
import router from '../routes/routes.js'

dotenv.config();


// initialize express app
const app = express();

// middleware
app.use(cors()); // allows server to accept requests from != origins
app.use(bodyParser.json()); // parse JSON into JS objects

// use router for any path with /api
app.use('/api', router);

// ROUTES

app.get('/', (req, res) => {
    res.send('API up');
});

// Port for the server to listen to
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
});