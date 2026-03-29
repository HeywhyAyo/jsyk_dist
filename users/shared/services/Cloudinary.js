"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = uploadImageToCloudinary;
exports.uploadMultipleImagesToCloudinary = uploadMultipleImagesToCloudinary;
const cloudinary_1 = require("cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
async function uploadImageToCloudinary(filebuffer) {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream((error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject("An error occurred while uploading the image.");
            }
            else if (result) {
                resolve(result.secure_url);
            }
        })
            .end(filebuffer);
    });
}
async function uploadMultipleImagesToCloudinary(fileBuffers) {
    const uploadPromises = fileBuffers.map((fileBuffer) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream((error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject("An error occurred while uploading the image.");
                }
                else {
                    if (result) {
                        resolve(result.secure_url);
                    }
                }
            })
                .end(fileBuffer);
        });
    });
    return Promise.all(uploadPromises);
}
//# sourceMappingURL=Cloudinary.js.map