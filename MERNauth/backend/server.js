require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const UserRoutes = require('./models/userModel')
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

//Routes

app.use('/api/users', UserRoutes); // Corrected route usage

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => {
    console.log("Connect to DB");
    app.listen(process.env.PORT, () => {
      console.log(`listening a port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
