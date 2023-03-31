const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const fileSize = parseInt(req.headers["content-length"])
  const TenMegaBytes = 10 * 1024 * 1024;

  if (fileSize <= TenMegaBytes) {
    cb(null, true);
  } else {
    cb("Please upload file size of less than 10Mb.", false);
  }
  
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadFile;