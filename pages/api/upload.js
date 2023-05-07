import fs from "fs";
import path from "path";

import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  publicPath();
  const options = {};
  options.uploadDir = path.join(process.cwd(), "/public/audio");
  options.filename = (name, ext, path, form) => {
    const fname = Date.now().toString() + "_" + path.originalFilename;
    res.status(200).json(fname);
    return fname;
  };

  const form = formidable(options);
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    console.log("Filename:" + fields);

    const audioFile = files.audioFile;
    const timestamp = Date.now();
    const fileName = `${timestamp}.webm`;
  });
}

const publicPath = () => {
  fs.readdir(path.join(process.cwd() + "/public", "/audio"), (err, files) => {
    if (err) {
      fs.mkdir(path.join(process.cwd() + "/public", "/audio"), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      });
    } else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
};
