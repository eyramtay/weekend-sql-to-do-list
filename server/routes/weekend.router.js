const express = require('express');
const router = express.Router();

// Database Connection
const pool = require('../modules/pool.js')

// GET
router.get('/', (req, res) => {
    pool.query('SELECT * FROM "weekend-list" ORDER BY "id";')

        .then(function (dbRes) {
            res.send(dbRes.rows);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

// POST
router.post('/', (req,res) => {
    console.log('req.body', req.body);
    let queryString = `
    INSERT INTO "weekend-list"
        ("task", "assigned_to", "notes", "completed")
        VALUES
            ($1, $2, $3, $4, $5);`;
    
    // SUBJECT to CHANGE based on CLIENT SIDE OBJECT
    let queryArgs = [
        req.body.task,
        req.body.assigned_to,
        req.body.notes,
        req.body.completed
    ];
    // console.log('query string is: ', queryString);
    pool.query(queryString, queryArgs)
        // GET back Database results
        .then(function (dbRes) {
            res.sendStatus(201);
        })
        // Or, handle database errors
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

// PUT
