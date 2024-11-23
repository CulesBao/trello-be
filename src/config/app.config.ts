import express, { urlencoded } from 'express';
import routes from '../routes/index.routes'
import 'reflect-metadata'
import { errorMiddleware } from '../middleware/error.middleware';
import { AppDataSource } from './data-source';
import { logger, loggerHttp } from './pino.config';

export default class App {
    public app: express.Application
    public port: number

    constructor(port: number) {
        this.app = express()
        this.port = port

        this.initializeMiddlewares()
        this.initializeRoutes()
        this.initializeDatabase()
        this.initializeErrorHandling()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server is running on port http://localhost:${this.port}`)
        })
    }

    private initializeMiddlewares() {
        this.app.use(urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use(loggerHttp)
    }

    private initializeRoutes() {
        this.app.use('/', routes)
    }
    private initializeDatabase() {
        AppDataSource.initialize()
            .then(async () => {
                logger.info("Data source initialized")
            })
            .catch((error: any) => logger.error(error))
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}