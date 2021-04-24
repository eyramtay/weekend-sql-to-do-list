const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const weekendRouter = require('/routes/weekend.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/weekend', weekendRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});