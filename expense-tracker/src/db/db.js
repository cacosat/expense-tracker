import sqlite3 from "sqlite3";

// database instance
const db = new sqlite3.Database('./expense-tracker.db', (e) => {
    // create database at ./expense-tracker.db and handle error
    if (e) {
        console.error(e.message);
    } else {
        db.run('PRAGMA foreign_keys = on;', (e) => { // allow foreign key constraints
            if (e) {
                console.error({'error allowing foreign key constraints': e.message});
            } else {
                console.log('DB connected and foreign keys contrains allowed')
                createTables();
            }
        }); 
        // createTables();
    }
});


// SQL STATEMENTS

// Table creation sql queries: categories and expenses
const createCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date_created TEXT DEFAULT CURRENT_TIMESTAMP
);
`;
const createExpensesTable = `
CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER, 
    category_name TEXT,
    description TEXT, 
    expense_date TEXT NOT NULL,
    amount REAL NOT NULL, 
    date_created TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id, category_name) REFERENCES categories(id, name) ON DELETE CASCADE
    );
    `;

// Create tables: executing SQL commands (passing command + callback for error handling)
function createTables() {
    db.run(createCategoriesTable, (error) => {
        if (error) {
            // error handling callback func
            return console.log(error.message);
        }
        console.log("categories created succesfully");
    });

    db.run(createExpensesTable, (error) => {
        if (error) {
            // error handling callback func
            return console.error(error.message);
        }
        console.log("expenses created succesfully");
    });
};


// export to use in other parts of the app
export default db