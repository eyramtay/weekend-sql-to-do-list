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
router.put('/:id', (req, res) => {
    let weekendId = req.params.id;
    let sqlText = `UPDATE "weekend-list" SET "completed"='TRUE' WHERE "id"=$1`;
    // console.log('setting up query text for put);

    pool.query(sqlText, [weekendId])
        .then((resDB) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

// DELETE
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    // console.log('Delete request id', redId);

    let sqlText = 'DELETE FROM "weekend-list" WHERE "id"=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task DELETED');
            res.sendStatus(200);
        })
        .catch((error) => {
            // Using a good error message to help out my future self.
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); 
        });
});
module.exports = router;