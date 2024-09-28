import express, { urlencoded } from 'express';
import routes from './src/routes/index.routes.js'
import {errorHandlingMiddleware} from './src/middleware/errorHandler.middleware.js'
const app = express();

app.use(urlencoded({ extended: true }))
app.use(express.json());
app.use('/', routes)
app.use(errorHandlingMiddleware)

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})