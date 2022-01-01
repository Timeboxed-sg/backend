import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './src/common/logger';
import morganMiddleware from './src/common/morganMiddleware';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganMiddleware)

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Timeboxed application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
