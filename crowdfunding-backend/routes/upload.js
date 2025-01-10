const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const Campaign = require("../models/Campaign");
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/create", upload.fields([
    { name: "governmentId", maxCount: 1 },
    { name: "proofPhoto", maxCount: 1 },
    { name: "liveSelfie", maxCount: 1 },
]), async (req, res) => {
    try {
        const files = req.files;
        const governmentIdURL = files.governmentId 
            ? (await cloudinary.uploader.upload(files.governmentId[0].path)).secure_url 
            : "";
        const proofPhotoURL = files.proofPhoto 
            ? (await cloudinary.uploader.upload(files.proofPhoto[0].path)).secure_url 
            : "";
        const liveSelfieURL = files.liveSelfie 
            ? (await cloudinary.uploader.upload(files.liveSelfie[0].path)).secure_url 
            : "";

        const newCampaign = new Campaign({
            ...req.body,
            governmentId: governmentIdURL,
            proofPhoto: proofPhotoURL,
            liveSelfie: liveSelfieURL,
        });

        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({ message: "Error creating campaign", error });
    }
});

module.exports = router;
