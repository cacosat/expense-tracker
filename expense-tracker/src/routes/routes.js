import express from 'express';
import db from '../db/db.js';

// New instance of router object, later used to define routes
const router = express.Router();

// ENDPOINTS (app.METHOD(path, callback))

// Endpoint 1: Adding new category through POST /categories

router.post('/categories', (req, res) => { // New route for HTTP POST on the path /categories
    const {name} = req.body; // getting category's 'name' property expected from the request
    if (!name || !/^[a-zA-Z0-9\s.,':;-]{3,50}$/.test(name)) { // regex to limit to any char (and space) between 3 - 50, against which name is tested
        // best practice error handling for when the request doesn't contain name, sent as JSON object w/error messg
        return res.status(400).json({error: 'Endpoint POST categories, name invalid'}) // Bad request status code 400
    }

    // inserts data into the table 'categories', specifically a (?) parametrized value into 'name' column
    const insertCatQuery = 'INSERT INTO categories (name) VALUES (?)'; 
    // (?) is a placeholder later replaced in db.run() with the [name] (array of parameters for the sql)

    db.run(insertCatQuery, [name], function(error) {
        /* db.run() allows to execute query with a params array [], 
        in this case it allows to pass 'name' to the (?) sql placeholder */
        if (error) {
            return res.status(500).json({error: error.message}); // 500 Internal server error
        }
        
        /* here, 'this' context has the id of the last row inserted into the table
        because of sqlite3 this.lastID will contain rowid (= id because of AUTOINCREMENT)
        of the last row added */
        const newCatId = this.lastID; 
        res.status(201).json({id: newCatId, name: name}); // 201 Created
    });
});

// Endpoint 2: Retrieving categories through HTTP GET path /categories

router.get('/categories', (req, res) => {
    const getCatQuery = 'SELECT * FROM categories'; // all columns from categories

    // sqlite3.Database.all() executes the SQL and fetches all rows mathicng the query (in this case all)
    // takes a query, parameter array and function that executes when the query is completed
    db.all(getCatQuery, [], (error, rows) => {
        // error contains info of the error if there is one, and rows contains the rows if it was succesful
        
        // error handling
        if (error) {
            return res.status(500).json({error: error.message});
        }

        // success
        res.json(rows);
    });
});

// Endpoint 3: Adding new expenses through HTTP POST path /expenses

router.post('/expenses', (req, res) => {
    const {category_id, category_name, description, expense_date, amount} = req.body;

    if (!category_id || !category_name || !description || !/^[a-zA-Z0-9\s.,':;-]{1,500}$/.test(description) || !expense_date || !amount || amount <= 0) {
        return res.status(400).json({error:'All fields required and/or invalid entry, at POST request to expenses'})
    }

    const postExpensesQuery = 'INSERT INTO expenses (category_id, category_name, description, expense_date, amount) VALUES (?, ?, ?, ?, ?)';

    // Database.run() when no value is expected
    db.run(postExpensesQuery, [category_id, category_name, description, expense_date, amount], function(error) {
        if (error) {
            return res.status(500).json({error: error.message});
        }
        const newExpenseId = this.lastID;
        res.status(201).json({id: newExpenseId, ...req.body})
    });
});

// Endpoint 4: Retrieving expenses through HTTP GET path /expenses

router.get('/expenses', (req, res) => {
    let getExpensesQuery = 'SELECT * FROM expenses';
    let params = [];

    // filtering expenses if category is provided
    if (req.query.category_id) {
        getExpensesQuery += ' WHERE category_id = ?';
        params.push(req.query.category_id);
    }

    db.all(getExpensesQuery, params, (error, expenses) => {
        if (error) {
            return res.status(500).json({error:error.message});
        }
        res.json(expenses);
    });
});

// Endpoint 5: Total sum of expenses /GET expenses-total

router.get('/expenses/total', (req, res) => {
    // SQL query to sum all the column amount (treated as 'total') from expenses
    let getExpensesTotalQuery = 'SELECT SUM(amount) as total FROM expenses';
    let params = [];

    // filter by category
    if(req.query.category_id) {
        getExpensesTotalQuery += ' WHERE category_id = ?'; // ? is a placeholder, later specified by params in db.get()
        params.push(req.query.category_id);
    }

    // Database.get() used for when one value is expected, returns single value instead of array (.all())
    db.get(getExpensesTotalQuery, params, function(error, row) {
        if (error) {
            return res.status(500).json({error: error.message});
        }
        res.json({total: row.total});
    });
});

// Endpoint 6: DELETE request on categories with id specified through URL param

router.delete('path', (req, res) => {});

// Export

export default router;