const fs = require("fs");

const db = require("../models");
const File = db.files;
const TenMegaBytes = 10 * 1024 * 1024;
const baseUrl = "http://localhost:8000/files/";
const uploadFile = require("../middleware/upload");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });

    // File.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(
    //     __basedir + "/resources/static/assets/uploads/" + req.file.originalname
    //   ),
    // }).then((file) => {
    //   fs.writeFileSync(
    //     __basedir + "/resources/static/assets/tmp/" + file.originalname,
    //     file.data
    //   );

    //   return res.send(`File has been uploaded.`);
    // });
  } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
       return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};




const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      let {birthtime,size} = fs.statSync(directoryPath+`${file}`)
      fileInfos.push({
        name: file,
        size:Math.round((size/1024*1024)/1024)+`Kb`,
        date:birthtime.toDateString(),
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const removeFile = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  uploadFiles,getListFiles,removeFile,download
};