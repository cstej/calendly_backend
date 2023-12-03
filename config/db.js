const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(process.env.mongoDB, {
    useNewUrlParser: true,
  });
};

module.exports = connect;
