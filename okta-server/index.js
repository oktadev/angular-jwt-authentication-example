const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const profile = require('./profile');

const port = process.env.PORT || 10101;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken());

app.use('/', profile);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
