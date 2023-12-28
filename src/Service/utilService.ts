import { httpCustomUrlClient } from "../Common/Service";
import { BASE_URL } from "../Common/constant";

const getSignedUrl = async (data: any) => {
    try {
        const { fileName, fileType, mainAadhaar, photo_key } = data;

        const response = await fetch(`${BASE_URL}customer/uploadimages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName, fileType, mainAadhaar, photo_key }),
        });

        if (!response.ok) {
            throw new Error("Failed to get signed URL");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in getSignedUrl:", error);
        return { success: false, message: "Error getting signed URL" };
    }
};


export const uploadFile = async (
    url: string,
    file: File
): Promise<any> => {
    try {
        let res: any = await httpCustomUrlClient(url, "PUT", file);
        console.log("res", res);
        return res;
    } catch (err) {
        console.error(err);
        console.groupEnd();
    }
};

export const processUrl = (url: string) => {
    const s3Domain = "https://jamanentterprise.s3.ap-south-1.amazonaws.com";
    // Check if the URL already contains the S3 domain
    if (url.includes(s3Domain)) {
        return url;
    } else {
        return `${s3Domain}/${url}`;
    }
}
export { getSignedUrl };
