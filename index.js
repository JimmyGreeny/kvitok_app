const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;
const path = require("path");

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

// --------------------------deployment------------------------------
//const __dirname = path.resolve();


  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"))
  });


// --------------------------deployment------------------------------

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);