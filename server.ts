import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './src/common/logger';
import morganMiddleware from './src/common/morganMiddleware';
import routes from './src/routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganMiddleware)

app.use('/api/v1', routes)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
})
