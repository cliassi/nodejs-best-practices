// const winston = require('winston'); //loggin
const express = require('express'); //framework
const app = express();

// require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.listen(port, () => winston.info(`Listening on port ${port}...`));