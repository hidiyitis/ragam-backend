import logger from "./logger.js";

const tryCatch =
   (controller) =>
   async (
      req,
      res,
      next,
   ) => {
      try {
         await controller(req, res);
         logger.info(
            `Request: ${req.method} ${req.originalUrl} - Response: ${res.statusCode}`,
         );
      } catch (err) {
         next(err);
      }
   };

export default tryCatch;