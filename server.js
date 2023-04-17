require("dotenv").config();

const { app } = require("./app");
const mongoose = require("mongoose");

const {
  PORT = 3000,
  DB_URL = "mongodb+srv://antoninaivanets:b4W2nVwP3QZbl1bU@cluster0.hb9jpwm.mongodb.net/db_soyummy?retryWrites=true&w=majority",
} = process.env;

(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL);
    console.log("Success db connected");
    app.listen(PORT, () => {
      console.log("Server start successful");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
