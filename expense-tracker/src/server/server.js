import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import db from "../db/db.js"; // SQLite database instance

dotenv.config();


// initialize express app
const app = express();

// middleware
app.use(cors()); // allows server to accept requests from != origins
app.use(bodyParser.json()); // parse JSON into JS objects

// ROUTES

app.get('/', (req, res) => {
    res.send('API up');
});

// Port for the server to listen to
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
});