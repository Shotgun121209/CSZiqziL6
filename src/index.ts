import path from "path";
import fs from "fs";
import sharp from "sharp";
import AdmZip from "adm-zip";

// Purpose:
// Image down scaler.

//Steps:
//1. Read Img by client
//2. Send to server (Not used in this part)
//3. Save to image
//3. Process (Downsizing image)
//4. Send back to client(Not used in this part)

//Additional Steps (If ZIP is used)

let originalZipPath = "./photo.zip";
let tempUnzipPath = "./temp";
let zip = new AdmZip(originalZipPath);
zip.extractAllTo(tempUnzipPath, true);
fs.readdir(tempUnzipPath, async (err,fileNames) => {
    if (err) throw err;

    fs.mkdirSync(tempUnzipPath + "/after/")
    for (let i = 0; i < fileNames.length; i++) {
        const fName = fileNames[i];
        
        let imgPath= tempUnzipPath + "/" + fName;
        console.log(imgPath);
if (fs.existsSync(imgPath) == true) {
    
    if (path.extname(imgPath) == ".jpg" || path.extname(imgPath) == ".JPG") {
        console.log("Verified Image File");
        sharp(imgPath).metadata().then((meta) =>{
            const width = meta.width!;
            const height = meta.height!;
            sharp(imgPath)
                .resize(Math.round(width / 2), Math.round(height / 2))
                .jpeg({ quality: 50 })
                .toFile(tempUnzipPath + "/after/" +  fName);
        });
    }
}
    }


});


