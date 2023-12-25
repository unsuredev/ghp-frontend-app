import React, { useState, useRef } from "react";
import { Button, CircularProgress, Card, CardContent, Typography } from "@material-ui/core";
import { getSignedUrl } from "../Service/FileService";

const FileUpload = () => {
    const [isLoading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            //@ts-ignore
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };



    const handleApiCall = async () => {
        try {
            if (!selectedFile) {
                console.error("Please select a file");
                return;
            }

            setLoading(true);
            // @ts-ignore
            const fileName = `photos/customer/12369854701/${Date.now()}_jaman_hp_982873641613`;

            // const fileName = `photos/customer/${12369854701}/${selectedFile.name}`;
            //@ts-ignore

            const signedUrlResult = await getSignedUrl({ "fileName": fileName, "fileType": selectedFile.type, "mainAadhaar": "982873641613", "photo_key": "InstalationLetter" })
            if (signedUrlResult.success) {
                // Use the signed URL to upload the file to S3
                const uploadResponse = await fetch(signedUrlResult.data[0], {
                    method: "PUT",
                    body: selectedFile,
                    headers: {
                        //@ts-ignore
                        "Content-Type": selectedFile.type,
                    },
                });

                if (uploadResponse.ok) {
                    console.log("File uploaded successfully");
                } else {
                    console.error("Error while uploading file");
                }
            } else {
                console.error("Error while getting signed URL");
            }
        } catch (error) {
            console.error("Error while uploading file", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".jpg, .jpeg, .png"
            />


            {selectedFile && (
                <Card style={{ marginTop: "20px" }}>
                    <CardContent>
                        <Typography variant="h6">Selected File Preview:</Typography>
                        {filePreview && <img src={filePreview} alt="File Preview" />}
                        {/* @ts-ignore */}
                        <Typography>Key:{selectedFile.name}</Typography>
                    </CardContent>
                </Card>
            )}
            {isLoading && <CircularProgress />}
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleApiCall}
            >
                Submit
            </Button>
        </div>
    );
};

export default FileUpload;
