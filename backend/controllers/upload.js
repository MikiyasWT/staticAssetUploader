const fs = require("fs");

const db = require("../models");
const File = db.files;
const TenMegaBytes = 10 * 1024 * 1024;
const baseUrl = "http://localhost:8000/files/";


const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    if(req.file.size > TenMegaBytes) {
      return res.send(`file can exceed 10mb`);
    }

    File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + file.name,
        file.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
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