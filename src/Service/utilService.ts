import { httpCustomUrlClient } from "../Common/Service";
import { BASE_URL } from "../Common/constant";
import { getToken } from "../Common/helper";

const getSignedUrl = async (data: any) => {
    try {
        const { fileName, fileType, mainAadhaar, photo_key, tab } = data;
        let response: any
        if (tab === 0) {
            response = await fetch(`${BASE_URL}customer/uploadimages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fileName, fileType, mainAadhaar, photo_key }),
            });
        }
        if (tab === 1) {
            {
                response = await fetch(`${BASE_URL}old/customer/uploadimages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ fileName, fileType, mainAadhaar, photo_key }),
                });
            }
        }

        if (photo_key === "product") {
            const { originalname } = data
            {
                response = await fetch(`${BASE_URL}product/upload`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": getToken() || ""
                    },
                    body: JSON.stringify({ fileName, fileType, originalname: originalname }),
                });
            }
        }
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
        return res;
    } catch (err) {
        console.error(err);
        console.groupEnd();
    }
};

export const processUrl = (url: string) => {
    const s3Domain = "https://jamanentterprise.s3.ap-south-1.amazonaws.com";
    // Check if the URL already contains the S3 domain
    if (url?.includes(s3Domain)) {
        return url;
    } else {
        return `${s3Domain}/${url}`;
    }
}


export { getSignedUrl };


export const getFileByBase64 = (base64: string, filename: any) => {
    let arr: any = base64.split(",");
    let mime: any = arr[0].match(/:(.*?);/)[1];
    return fetch(base64)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, { type: mime });
        });
};
