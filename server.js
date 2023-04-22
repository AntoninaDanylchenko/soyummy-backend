require("dotenv").config();

const { app } = require("./app");
const mongoose = require("mongoose");

const { DB_URL } = process.env;

const port = process.env.PORT || 5000;

(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL);
    console.log("Success db connected");
    app.listen(port, () => {
      console.log("Server start successful");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
