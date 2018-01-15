import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Promise from "bluebird";


import auth from "./routes/auth";
import users from "./routes/users";
import books from "./routes/books";
import Config from '../env-sample';

const app = express();
app.use(bodyParser.json());
//owerriding default mongoose Promise library with bluebird Promise library
mongoose.Promise = Promise;
mongoose.connect(Config.MONGO_LAB_URL, { useMongoClient: true });


app.use(function (req, res, next) {
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8000, () => console.log("Running on localhost:8000"));
