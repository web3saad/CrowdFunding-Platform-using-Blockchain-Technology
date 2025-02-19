"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

const CreateCampaign = () => {
    const [campaignName, setCampaignName] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const [target, setTarget] = useState("");
    const [duration, setDuration] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    // Proof of Activity Verification fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [governmentId, setGovernmentId] = useState<File | null>(null);
    const [address, setAddress] = useState("");
    const [proofPhoto, setProofPhoto] = useState<File | null>(null);
    const [liveSelfie, setLiveSelfie] = useState<File | null>(null);
    const [socialMedia, setSocialMedia] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const router = useRouter();
    const account = useActiveAccount();

    // Cloudinary file upload
    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "campaigns_preset");
        formData.append("folder", "sample/campaign_data");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dvgdowkff/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading file to Cloudinary:", error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const governmentIdURL = governmentId ? await uploadFile(governmentId) : "";
            const proofPhotoURL = proofPhoto ? await uploadFile(proofPhoto) : "";
            const liveSelfieURL = liveSelfie ? await uploadFile(liveSelfie) : "";

            const campaignData = {
                campaignName,
                campaignDescription,
                target,
                duration,
                walletAddress,
                fullName,
                email,
                phoneNumber,
                governmentId: governmentIdURL,
                address,
                proofPhoto: proofPhotoURL,
                liveSelfie: liveSelfieURL,
                socialMedia,
            };

            console.log("Campaign Data: ", campaignData);

            if (account?.address) {
                setMessage("Campaign requested successfully!");
                setMessageType("success");
                router.push("/dashboard/" + account.address);
            } else {
                throw new Error("Account address is not available");
            }
        } catch (e) {
            console.error("Error handling campaign submission: ", e);
            setMessage("An error occurred while requesting the campaign. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Request For Campaign</h2>
            {message && (
                <div
                    className={`p-4 mb-6 text-center text-white rounded-lg ${
                        messageType === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Campaign Details Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Campaign Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                            <input
                                id="campaignName"
                                type="text"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="campaignDescription" className="block text-sm font-medium text-gray-700">Campaign Description</label>
                            <textarea
                                id="campaignDescription"
                                value={campaignDescription}
                                onChange={(e) => setCampaignDescription(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target Amount</label>
                            <input
                                id="target"
                                type="number"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
                            <input
                                id="duration"
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">Wallet Address</label>
                            <input
                                id="walletAddress"
                                type="text"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Proof of Activity Verification Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Proof of Activity Verification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="governmentId" className="block text-sm font-medium text-gray-700">Government-issued ID (Upload scanned copy or photo)</label>
                            <input
                                id="governmentId"
                                type="file"
                                onChange={(e) => setGovernmentId(e.target.files?.[0] ?? null)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="proofPhoto" className="block text-sm font-medium text-gray-700">Proof of Activity (Photo)</label>
                            <input
                                id="proofPhoto"
                                type="file"
                                onChange={(e) => setProofPhoto(e.target.files?.[0] ?? null)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="liveSelfie" className="block text-sm font-medium text-gray-700">Facial Verification (Live Selfie)</label>
                            <input
                                id="liveSelfie"
                                type="file"
                                onChange={(e) => setLiveSelfie(e.target.files?.[0] ?? null)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700">Social Media Profiles (LinkedIn, Twitter)</label>
                            <input
                                id="socialMedia"
                                type="text"
                                value={socialMedia}
                                onChange={(e) => setSocialMedia(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Submit Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCampaign;
