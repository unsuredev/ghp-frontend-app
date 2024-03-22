import React from "react";
import {
    IProduct,
    ISelectMenuList,
} from "../../vm";
import { Formik } from "formik";
import { Grid, FormControl, TextField, Button, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { addAProduct, updateAProduct } from "../../Service/ProductService";
import * as yup from "yup";
import { CustomSelect, CustomTextField } from "../../Common/Library";
import ImageCropper from "../../Common/ImageCropper";
import { Delete, Loading } from "mdi-material-ui";
import { ToastContext } from "../../Common/ToastProvider";
import { getFileByBase64, getSignedUrl, processUrl, uploadFile } from "../../Service/utilService";
import { PRODUCT_UNIT, STATUS_DICT_FOR_PRODUCT } from "../../Common/constant";


const productSchema = yup.object().shape({
    title: yup.string().required("required"),
    slug: yup.string().required("required"),
    noOfBurner: yup.string().required("required"),
    materialType: yup.string().required("required"),
    ignitionType: yup.string().required("required")
});
const productWithOptionSchema = productSchema.shape({
    mrp: yup.number().required("required"),
    sellingPrice: yup.number().required("required"),
});




export interface ProductFormProps {
    onClose: Function;
    data?: IProduct;
}

const ProductForm: React.FC<ProductFormProps> = ({
    onClose,
    data
}) => {
    // custom hooks
    const { showToast } = React.useContext(ToastContext);
    const [isLoading, setLoading] = React.useState(false as boolean);
    const [product, setProduct] = React.useState({
        title: "",
        slug: "",
        image: "",
        mrp: 0,
        priceUnit: "piece",
        unitLabel: "",
        sellingPrice: 0,
        status: 0,
        deliveryTime: 0,
        ...data,
    } as IProduct);
    const [selectedImage, setSelectedImage] = React.useState(undefined as any);
    const [manageImageCropDialog, setManageImageCropDialog] = React.useState({
        isOpen: false,
        file: undefined,
        crop: {
            unit: "%",
            width: 60,
            aspect: 4 / 4,
        },
    } as {
        isOpen: boolean;
        file?: any;
        crop?: any;
    });
    const [selectedItems, setSelectedItems] = React.useState(
        [] as ISelectMenuList[]
    );

    const onDialogClose = (data?: IProduct) => {
        onClose(data);
    };

    const handleFileChange = (files: any) => {
        if (files[0].type.includes("image/")) {
            setSelectedImage(files[0]);
            handleOpenImageCropDialog(files[0]);
        } else {
            showToast("Select only images", "error");
        }
    };

    const uploadAFile = async (fileName: any, selectedFile: any) => {
        setLoading(true);
        try {
            const result = await getSignedUrl({
                fileName,
                //@ts-ignore
                fileType: "image/png",
                photo_key: "product",
                tab: 2,
                originalname: selectedFile.name
            });
            if (result.status === "success") {
                await uploadFile(result.data.presignedUrl, selectedFile);
                return result.data.key;
            } else {
                showToast(`Error while uploading image`, "error");
            }
        } catch (error) {
            //@ts-ignore
            showToast(`Error while uploading image: ${error.message}`, "error");
        }
        return undefined;
    };

    const handleOpenImageCropDialog = (file: any) => {
        setManageImageCropDialog({ ...manageImageCropDialog, isOpen: true, file });
    };

    const handleCloseImageCropDialog = async (data?: any) => {
        let selectedImg = undefined;
        if (data) {
            selectedImg = await getFileByBase64(data, selectedImage.name);
        }
        setManageImageCropDialog({
            ...manageImageCropDialog,
            file: undefined,
            isOpen: false,
        });
        setSelectedImage(selectedImg);
    };

    const deleteImage = (deletedImage: string, values: any) => {
        setProduct({
            ...values,
            imageUrl: "",
            image: "",
            deletedImage: deletedImage,
        });
    };



    //@ts-ignore
    const isEdit = data?._id != null;

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <section className="padding-16">
                <Formik
                    enableReinitialize
                    initialValues={product}
                    validationSchema={isEdit ? productSchema : productWithOptionSchema}
                    onSubmit={async (values: IProduct, { setSubmitting }) => {
                        let res;
                        let obj = { ...values };
                        // obj = removeNulls(obj);
                        setLoading(true);
                        if (obj._id) {
                            if (selectedImage) {
                                let name =
                                    `products/${obj._id}/` +
                                    new Date().getTime() +
                                    "-" +
                                    selectedImage.name.toLowerCase().replace(/ /g, "");
                                //@ts-ignore
                                let fileName = await uploadAFile(name, selectedImage, values._id);
                                if (fileName) {
                                    obj.imageUrl = fileName;
                                }
                            }
                            res = await updateAProduct(obj);

                        } else {
                            res = await addAProduct(obj);
                            if (res.status === "success") {
                                if (selectedImage) {
                                    let data = { ...res.data };
                                    let name =
                                        `products/${res.data._id}/` +
                                        new Date().getTime() +
                                        "-" +
                                        selectedImage.name.toLowerCase().replace(/ /g, "");
                                    let fileName = await uploadAFile(name, selectedImage);
                                    if (fileName) {
                                        data.imageUrl = fileName;
                                        res = await updateAProduct(data);
                                    }
                                }
                            }
                        }
                        if (res.status == "success") {
                            showToast(
                                `Product ${obj._id ? "updated" : "created"} successfully`,
                                "success"
                            );
                            onDialogClose(res.data);
                        } else {
                            showToast(
                                res?.message ||
                                `Error while ${values._id ? "updating" : "creating"} product`,
                                "error"
                            );
                        }
                        setLoading(false);
                        setSubmitting(false);
                    }
                    }
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit /* and other goodies */,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <CustomTextField name="title" label="Title" />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <CustomTextField name="slug" label="Slug" />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <CustomTextField name="brand" label="Brand" type="text" />

                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <CustomTextField name="manufacturer" label="Manufacter" type="text" />

                                </Grid>
                                {!isEdit && (
                                    <>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <CustomSelect
                                                name="priceUnit"
                                                label="Price Unit"
                                                menuList={Object.keys(PRODUCT_UNIT).map((d) => {
                                                    return { value: d, label: PRODUCT_UNIT[d] };
                                                })}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <CustomTextField name="unitLabel" label="Unit Label" />
                                        </Grid>

                                    </>
                                )}
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <CustomTextField
                                        multiline={true}
                                        rows={6}
                                        name="description"
                                        label="Description"
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CustomTextField name="mrp" label="MRP" type="number" />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CustomTextField name="sellingPrice" label="Selling Price" type="number" />
                                </Grid>

                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CustomTextField name="noOfBurner" label="No of Burner" type="text" />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <CustomTextField name="warranty" label="warranty period" type="text" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <CustomTextField name="materialType" label="Material Type" type="text" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <CustomTextField name="ignitionType" label="Ignition Type" type="text" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <CustomTextField name="knobsType" label="knobs Type" type="text" />
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <CustomSelect
                                        name="status"
                                        label="Status"
                                        menuList={Object.keys(STATUS_DICT_FOR_PRODUCT).map((d) => {
                                            return { value: d, label: STATUS_DICT_FOR_PRODUCT[d] };
                                        })}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <CustomTextField
                                        name="deliveryTime"
                                        label="Delivery Time (days)"
                                        type={"number"}
                                    />
                                </Grid>

                                {values.imageUrl ? (
                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <GridList cellHeight={180} cols={1} className="gridList">
                                            <GridListTile>
                                                <img src={processUrl(values.imageUrl)} alt="log" />
                                                <GridListTileBar
                                                    actionIcon={
                                                        <IconButton
                                                            onClick={() =>
                                                                deleteImage(values.imageUrl as string, values)
                                                            }
                                                            color="secondary"
                                                        >
                                                            <Delete color="error" className="icon" />
                                                        </IconButton>
                                                    }
                                                />
                                            </GridListTile>
                                        </GridList>
                                    </Grid>
                                ) : (
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Base Image"
                                                type="file"
                                                name="image"
                                                onChange={(event: any) =>
                                                    handleFileChange(event.target.files)
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        accept: "image/x-png,image/gif,image/jpeg",
                                                    },
                                                }}
                                                error={errors.imageUrl && !selectedImage ? true : false}
                                                helperText={errors.imageUrl}
                                            />
                                        </FormControl>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Grid container spacing={2} justify="flex-end">
                                        <Grid item>
                                            <Button
                                                onClick={() => onClose()}
                                                variant="outlined"
                                                color="secondary"
                                                type="button"
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" type="submit">
                                                {values._id ? "Update" : "Add"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </section>
            {manageImageCropDialog.isOpen && (
                <ImageCropper
                    data={manageImageCropDialog.file}
                    onClose={handleCloseImageCropDialog}
                    crop={manageImageCropDialog.crop}
                />
            )}
        </React.Fragment>
    );
};

export default ProductForm;
