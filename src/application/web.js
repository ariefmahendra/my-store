import express from "express"
import cors from "cors"
import routes from "../route/route.js"
import {errorMiddleware} from "../middleware/error-middleware.js"

export const web = express()

web.use(express.json())
web.use(cors({ origin: "*" }))
web.use(routes)

web.use(errorMiddleware)