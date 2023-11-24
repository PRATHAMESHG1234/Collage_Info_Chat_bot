const express = require("express");
const next = require("next");
const connectDb = require("./utilsServer/connectDb");
const data = require("./api/data");
const { updateAndPreprocessdata } = require("./api/functions");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(async () => {
  const app = express();
  app.use(express.json());

  connectDb();
  // Define your API routes or other middleware here, if applicable
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/chat", require("./api/chat"));

  app.all("*", (req, res) => handle(req, res));

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
