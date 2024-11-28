const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://yicigob168:testing123..@cluster0.1pkbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Error in DB connection", err);
    });
};
