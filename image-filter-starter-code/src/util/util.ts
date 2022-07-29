import fs from "fs";
import Jimp = require("jimp");
const path = require('path');
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export function filterImageFromURL(inputURL: string): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath = "/tmp/";
      const fileName = "filtered." + Math.floor(Math.random() * 2000) + ".jpg";

      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath + fileName, (img) => {
          resolve([__dirname + outpath + fileName, fileName]);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export function deleteLocalFiles(fileName: string) {
    var file:string = __dirname+"/tmp/";
    var filePath = path.join(file, fileName)
    console.log("filePath:" + filePath);
    fs.unlinkSync(filePath);
}
