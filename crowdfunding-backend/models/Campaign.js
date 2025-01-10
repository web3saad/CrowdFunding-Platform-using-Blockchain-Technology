const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
    campaignName: String,
    campaignDescription: String,
    target: Number,
    duration: Number,
    walletAddress: String,
    fullName: String,
    email: String,
    phoneNumber: String,
    governmentId: String, // URL of uploaded ID
    address: String,
    proofPhoto: String, // URL of uploaded proof photo
    liveSelfie: String, // URL of uploaded selfie
    socialMedia: String,
});

module.exports = mongoose.model("Campaign", CampaignSchema);
