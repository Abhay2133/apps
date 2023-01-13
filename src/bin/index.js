const fs = require("node:fs");
const path = require("node:path")
const {networkInterfaces} = require("node:os")
const {createServer} = require("node:http")

global.isPro = (process.env.NODE_ENV || "").toLowerCase() === "production";
global.imgDsessions = {};
global.log = (...args) => console.log(...args);
global.dlog = (...args) => !isPro && console.log(...args);
global.elog = (...args) => console.error(...args);
global.j = path.join;
global.basename = path.basename;
global.sdir = path.resolve("src", "static");
global.pdir = j(sdir, "public");
global._port = process.env.PORT || 3000;

const colors = require("colors");
const exp = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const {logger, liveReload} = require("./mods/hlpr");
const {exec} = require("node:child_process");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {router} = require("./mods/routes");
const {Server} = require("socket.io")

const app = exp();
const server = createServer(app);
const io = new Server(server);

module.exports = async function () {
  const  engine = await require("./mods/templateEngine")();
  log(colors.green("Starting Server !"))
  if (!Array.prototype.at)
    Array.prototype.at = function (n) {
      if (typeof n !== "number") return;
      let a = parseInt(n);
      return a < 0 ? this[this.length + n] : this[n];
    };

  global.stdout = (...a) => process.stdout.write(a.join(" "));
  if (typeof global.__appV == "undefined") global.__appV = 0;

  if (fs.existsSync(j(sdir, "files")))
    fs.rm(j(sdir, "files"), { recursive: true }, () => {});

  if (!isPro) {
    global.newReloaded = false;
    global.emitReload = () => io.emit("reload");
  }
  app.use(cors());
  app.engine(".hbs", engine);
  app.set("view engine", ".hbs");
  app.set("views", j(__dirname, "..", "static", "views"));

  app.use(logger);

  app.use(cookieParser());
  app.use(exp.static(j(sdir, "public")));
  app.use(exp.json());
  app.use(compression());
  if (typeof global.__c4u !== "undefined") app.use(__c4u);

  app.use(router);
  require("./mods/socketHandler")(io);
  
  server.listen({ port: _port }, async () => {
    let ni = networkInterfaces();
    let ms = 15;
    log("Server is onine xD");
    log("  MODE %s : %s", " ".repeat(ms - 4), isPro ? "PRO" : "DEV");
    for (let key in ni)
      ni[key].forEach((item, i) => {
        if (item.family == "IPv4")
          log("  %s %s : http://%s:%i",key," ".repeat(ms - key.length),item.address,_port);
      });
    log();
    if(!isPro) liveReload();
    require("fs").existsSync(j(sdir, "files")) &&
      require("fs").rm(j(sdir, "files"), { recursive: true }, () => {});
  });
}
