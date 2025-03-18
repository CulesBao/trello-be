import express, { urlencoded } from 'express';
import routes from '../routes/index.routes'
import cors from 'cors'
import 'reflect-metadata'
import { errorMiddleware } from '../middleware/error.middleware';
import { AppDataSource } from './data-source';
import { logger, loggerHttp } from './pino.config';
import passport from 'passport';
import expressSession from 'express-session'
import '../modules/auth/oauth2'

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
        this.app.use(cors({
            origin: '*',
            credentials: true
        }))
        this.app.use(expressSession({
            secret: "sercret",
            saveUninitialized: true,
            resave: true,
            cookie: {
                maxAge: 1000 * 60 * 60 // 1 hour
            }
        }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
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