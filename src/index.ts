import path from "path";
import fs from "fs";
import sharp from "sharp";

// Purpose:
// Image down scaler.

//Steps:
//1. Read Img by client
//2. Send to server (Not used in this part)
//3. Save to image
//3. Process (Downsizing image)
//4. Send back to client(Not used in this part)

let imgPath="./ziqzi.jpg";
if (fs.existsSync(imgPath) == true) {
    console.log("Image exists in user's files.")
    
    if (path.extname(imgPath) == ".jpg") {
        console.log("Verified Image File");
        sharp(imgPath).metadata().then((meta) =>{
            const width = meta.width!;
            const height = meta.height!;
            sharp(imgPath)
                .resize(Math.round(width / 2), Math.round(height / 2))
                .jpeg({ quality: 50 })
                .toFile(".fixed.jpg");
        });
    }
}
