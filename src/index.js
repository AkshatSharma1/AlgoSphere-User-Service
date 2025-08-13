const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server.config');
const connectToDB = require('./config/db.config');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`User-Service listening on port: ${PORT}`);
  await connectToDB();
  console.log("Successfully connected to DB");
});