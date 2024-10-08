import { web } from "./app/web.js";
import { logger } from "./app/logger.js";

web.listen(8080, () => {
    logger.info('App Running')
})