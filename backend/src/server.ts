import express from "express";

import Middleware from "./middleware";
import router from "./routes";

const PORT = 3001;
const server = express();

server.use(Middleware.CORS);
server.use(Middleware.json);
server.use(router);
server.use(Middleware.errorHandler);

server.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT}`);
});
