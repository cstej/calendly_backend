const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Income");
  },
  filename: function (req, file, cb) {3
    const date = Date.now();
    console.log(file, "");
    cb(null, date + "-" + file.originalname);
  },
});

const mustbe = {
  storage: storage,
};

const incomeuploads = multer(mustbe);
module.exports = incomeuploads;
