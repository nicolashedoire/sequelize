const express = require("express");
const pretty = require("express-prettify");
const helmet = require("helmet");
// const csurf = require('csurf');
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const log = require("./helpers/log");
const router = require("./routes");
const emitter = require("./eventManager");
const cli = require("./cli");
require("./modules/os");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

dotenv.config();

class Server {
  init() {
    log.title("Server configuration");
    app.use(express.json({ limit: "50mb" }));
    log.success("Configuration maximum request body size OK");
    app.use(helmet());
    log.success("Configuration helmet ok...");
    app.use(pretty({ query: "pretty" }));
    log.success("Configuration express-prettify OK");
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    log.success("Configuration bodyParser OK");
    app.use(cors());
    log.success("Configuration cors OK");
    app.use(compression());
    log.success("Compression OK");

    app.use(express.static(path.join(__dirname, "public")));
    log.success("Static files access OK");

    app.use("/", router);

    log.title("Routes");
    router.stack.map((layer) => {
      if (layer.route) {
        log.info(
          `Route: ${layer.route.path} Method: ${layer.route.stack[0].method}`
        );
      }
    });

    server.listen(process.env.PORT, (err) => {
      if (err) {
        log.error(err);
      }

      log.title("Server");
      log.info(`Version: ${process.env.VERSION}`);
      log.success(`Server is available on port ${process.env.PORT}`);
    });

    io.on("connection", (client) => {
      log.success("connection socket-io ok");
      client.on("join", function (data) {
        emitter.emit("message", data);
      });
    });

    // Décommentez ce code pour avoir accés à la ligne de commande

    // setTimeout(function () {
    //   cli.init();
    // }, 500);
  }
}

const application = new Server();

application.init();
