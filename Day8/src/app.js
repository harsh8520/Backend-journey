import e from "express";
import routes from "./routes/appRoutes.js";
import appMiddleware from "./middleware/auth.js";
import { logger } from "./middleware/logger.js";

const app = e()
app.use(e.json())

app.use(logger)
app.use('/', routes)


export default app