// utilServices.js

import { BASE_URL } from "../Common/constant"; // Replace with your actual API base URL

const getSignedUrl = async (data: any) => {
    try {
        const { fileName, fileType, mainAadhaar, photo_key } = data
        const response = await fetch(`${BASE_URL}customer/uploadimages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName,
                fileType,
                mainAadhaar,
                photo_key
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to get signed URL");
        }

        const result = await response.json();
        console.log("result", result);

        return result;
    } catch (error) {
        console.error("Error in getSignedUrl:", error);
        return { success: false, message: "Error getting signed URL" };
    }
};

export { getSignedUrl };
