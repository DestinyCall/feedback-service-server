require("./config/config")
require("./db/mongoose")

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const passport = require('passport')
const cookieSession = require('cookie-session')

const Logger = require("./service/logger/winston")

const Log = new Logger("app")

const app = express()

app.use(morgan("combined", { stream: Log.stream }));

// Use cors
app.use(cors());

// Use the body-parser package in our application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET]
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

//const MasterRouter = require("./routes/masters.route");
//const RulesRouter = require("./routes/rules.route");

//app.use("/master", MasterRouter);
//app.use("/rule", RulesRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

// Capture 500 errors
app.use((err, req, res, next) => {
  Log.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 erors
app.use((req, res, next) => {
  Log.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
