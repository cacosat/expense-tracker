const sqlite3 = require('sqlite3').verbose();
// verbose() helps debugging logging all SQL queries to console

const db = new sqlite3.Database('./expense-tracker.db', (err) => {
    // create database at ./expense-tracker.db and handle error
    if (err) {
        console.error(err.message);
    } else {
        console.log('SQLite DB conected')
    }
});

module.exports = db;