const express = require("express");
const AppError = require("./utils/newAppError");
const GlobalErrorController = require("./controller/errorController");
const cors = require("cors");
const morgan = require("morgan");
const blogRouter = require("./routes/router");

const app = express();
const port = 3000;

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

/// Note : if query is not "privacy" then bydefault it return blogs analytics
app.use("/api", blogRouter);

app.all("*", function (req, res, next) {
  const err = new AppError(`Can't find ${req.originalUrl} in this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(GlobalErrorController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
