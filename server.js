const SERVER_PORT = process.env.PORT || 8080;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

// const apiRouter = require("./api");

const app = express();
// const router = express.Router();

// const formidable = require("express-formidable");
// app.use(formidable());

// define the database file to use
const dbFilename = 'data/hotel.sqlite';
const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database(dbFilename);





// app.engine(
//   "hbs",
//   exphbs({
//     defaultLayout: "main",
//     extname: "hbs"
//   })
// );
// app.set("view engine", "hbs");

// app.use(express.static("public"));
// app.use(express.static("assets"));

// app.use("/api", apiRouter);

// handle HTTP POST requests
app.use(bodyparser.json());

app.get("/", function (req, res, next) {
  res.render("home");
});
app.get("/customers", function (req, res) {
  db.all("SELECT name, email, phone, address, city " +
    "FROM customers", function (err, rows) {
      rows.forEach(function (row) {
        console.log(row.name, row.email, row.phone,
          row.address, row.city);
      });
      const mydata = { customers: rows };

      res.status(200).json({
        customers: rows
      });
    });
});

app.listen(SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});
