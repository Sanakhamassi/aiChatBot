import express from 'express'
import { config } from 'dotenv'
import morgan from "morgan"
import appRouter from './routes/index.js'
config()
const app = express()
//middleware
app.use(express.json())
//only used on developpement mode once on production will be removed
app.use(morgan("dev"))

app.use("/api/v1", appRouter)
export default app;