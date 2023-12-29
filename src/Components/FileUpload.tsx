import React, { useState, useRef } from "react";
import { Button, CircularProgress, Card, CardContent, Typography } from "@material-ui/core";
import { getSignedUrl, uploadFile } from "../Service/utilService";
import { ToastContext } from "../Common/ToastProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FileUploadProps {
    mainAadhaar: string;
    photo_key: string;
    tab: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ mainAadhaar, photo_key, tab }) => {
    const { showToast } = React.useContext(ToastContext);

    const [isLoading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const validationSchema = Yup.object({
        file: Yup.mixed()
            .test("fileSize", "File size must be less than 800KB", (value) => {
                if (value) {
                    return value.size <= 800 * 1024; // 800KB in bytes
                }
                return true; // Allow empty files
            })
            .required("Please select a file"),
    });

    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Handle file upload
            try {
                setLoading(true);
                const fileName = `photos/customer/12369854701/${Date.now()}_jaman_hp_${mainAadhaar}`;
                const signedUrlResult = await getSignedUrl({
                    fileName,
                    //@ts-ignore
                    fileType: values.file.type,
                    mainAadhaar,
                    photo_key,
                    tab
                });
                if (signedUrlResult.status === "success") {
                    //@ts-ignore
                    await uploadFile(signedUrlResult.data.presignedUrl, values.file);
                    showToast(`Image uploaded successfully`, "success");
                    formik.resetForm();
                    handleReset()

                } else {
                    showToast(`Error while uploading image`, "error");
                }
            } catch (error) {
                console.error("Error while uploading file", error);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
        formik.setFieldValue("file", file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleReset = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
        }
        setSelectedFile(null);
        setFilePreview(null);
        formik.resetForm();
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept=".jpg, .jpeg, .png"
                />

                {formik.errors.file && formik.touched.file && (
                    <div style={{ color: "red", marginTop: "5px" }}>{formik.errors.file}</div>
                )}

                {selectedFile && (
                    <Card
                        style={{
                            marginTop: "20px",
                            position: "relative",
                            border: "2px solid #4CAF50", // Green border when file is selected
                        }}
                    >
                        {isLoading && (
                            <CircularProgress
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6">Photo Preview:</Typography>
                            {filePreview && (
                                <img
                                    src={filePreview}
                                    alt="File Preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        margin: "10px 0",
                                    }}
                                />
                            )}
                            <Typography>Key: {selectedFile.name}</Typography>
                        </CardContent>
                    </Card>
                )}

                {selectedFile && (
                    <div style={{ marginTop: "20px" }}>
                        <Button variant="contained" color="default" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "10px" }}
                            type="submit"
                        >
                            Upload
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default FileUpload;
