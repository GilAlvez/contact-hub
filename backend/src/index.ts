import express from "express";

import router from "./routes";

const PORT = 3001;
const server = express();
server.use(router);

server.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT}`);
});
