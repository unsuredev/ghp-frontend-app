import React from "react";
import {
    Grid,
    Typography,
    Button,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody, IconButton,
    Tooltip,
    TableContainer,
} from "@material-ui/core";
import {
    ICategory, IProduct, IProductSearchObj, ISelectMenuList,
} from "../../vm";

import {
    Pencil,
    TrashCan,
    ViewList,
} from "mdi-material-ui";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ConfirmDialogContext } from "../../Common/ConfirmDialogProvider";
import { getProducts, deleteAProduct } from "../../Service/ProductService";


import ProductForm from "./ProductForm";

import { ToastContext } from "../../Common/ToastProvider";
import CustomerDrawer from "../../Common/CustomerDrawer";
import { processUrl } from "../../Service/utilService";


export interface ProductMainProps { }

const ProductMain: React.FC<ProductMainProps> = () => {
    const { showConfirmDialog } = React.useContext(ConfirmDialogContext);
    const queryParams = new URLSearchParams(window.location.search);
    const { showToast } = React.useContext(ToastContext);

    // state
    const [isLoading, setLoading] = React.useState(false as boolean);
    const [products, setProducts] = React.useState([] as IProduct[]);
    const [manageProductDialog, setManageProductDialog] = React.useState({
        isOpen: false,
        data: {},
        editIndex: -1,
    } as {
        isOpen: boolean;
        data: any;
        editIndex: number;
    });
    const [selectedProductIndex, setSelectedProductIndex] = React.useState<
        number | null
    >(null);

    const [subCategoryDict, setSubCategoryDict] = React.useState({} as any);
    const [searchObj, setSearchObj] = React.useState({
        offset: 0,
        limit: 10,
        search: "",
        status: queryParams.get("status") ? Number(queryParams.get("status")) : 9,
        showAllData: true,
        productId: queryParams.get("_id") ? queryParams.get("_id") : ""
    } as IProductSearchObj);



    React.useEffect(() => {
        const asyncFunc = async () => {
            setLoading(true);
            await getAllProduct();
        };
        asyncFunc();
    }, []);

    const getAllProduct = async () => {
        const result = await getProducts()
        setProducts(result.data)

    };



    const handleAddDialogOpen = (isOpen: boolean, editIndex?: number) => {
        let data: any = undefined;
        if (editIndex !== undefined) {
            data = products[editIndex];
        }
        setManageProductDialog({
            isOpen: isOpen,
            data: data,
            editIndex: editIndex !== undefined ? editIndex : -1,
        });
    };


    const handleClose = (data?: IProduct) => {
        let productList = [...products];
        if (data) {
            if (manageProductDialog.editIndex !== -1) {
                productList[manageProductDialog.editIndex] = data;
            } else {
                productList.unshift(data);
            }
        }
        setProducts(productList);
        setManageProductDialog({
            isOpen: false,
            data: undefined,
            editIndex: -1,
        });
    };

    const deleteProduct = (index: number) => {
        showConfirmDialog("Are you sure", "Do you want to delete?", async () => {
            let productList = [...products];
            setLoading(true);
            let result = await deleteAProduct(productList[index]._id as string);
            setLoading(false);
            if (result?.success) {
                showToast("products deleted successfully", "success");
                productList.splice(index, 1);
                setProducts(productList);
            } else {
                showToast(result?.message || "Error while deleting products", "error");
            }
        });
    };



    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setSearchObj({
            ...searchObj,
            [name]: value,
        });
    };


    return (
        <React.Fragment>
            {/* {isLoading && <CircularProgress />} */}
            <Grid container spacing={2} style={{ marginTop: "4rem" }}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="h5">Products</Typography>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddDialogOpen(true)}
                            >
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="padding-16">
                        {/* <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-around"
                        >
                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    // value={state.searchObj.name}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item lg={3} md={4} sm={6} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="filterByEnable" className="select-label">
                                        Enable Type
                                    </InputLabel>
                                    <Select
                                        labelId="filterByEnable"
                                        // value={state.searchObj.isEnabled}
                                        name="showEnabled"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="enabled">Enabled</MenuItem>
                                        <MenuItem value="disabled">Disabled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={async () => {
                                        const searchObj = {
                                            offset: 0,
                                            limit: 10,
                                            // name: "",
                                            // roleId: 99,
                                            // email: "",
                                            search: "",
                                            // userId: "",
                                            // isEnabled: "all",
                                            status: 9,
                                            showAllData: true,
                                        };
                                        await getAllProduct();
                                    }}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid> */}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead >
                                <TableRow >
                                    <TableCell>Image</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Manufacter</TableCell>
                                    <TableCell>MRP</TableCell>
                                    <TableCell>Selling Price</TableCell>
                                    <TableCell>Price Unit</TableCell>
                                    <TableCell>Burner</TableCell>
                                    <TableCell>MaterialType</TableCell>
                                    <TableCell>IgnitionType</TableCell>
                                    <TableCell>In Stock</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Delivery</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {products.length > 0 ? (
                                    products.map((product, productIndex) => (
                                        <TableRow key={product._id}>
                                            <TableCell>
                                                {product.imageUrl ? (
                                                    <img
                                                        src={processUrl(product.imageUrl)}
                                                        alt={product.title}
                                                        className="sub-category-img"
                                                        height="100px"
                                                        width="100px"
                                                    />
                                                ) : (
                                                    <img
                                                        src=""
                                                        alt={product.title}
                                                        className="sub-category-img"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.category}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">{product.title}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.brand}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.manufacturer}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.mrp}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.sellingPrice}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.priceUnit}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.noOfBurner}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.materialType}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.ignitionType}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.isAvailable === true ? "Yes" : "NO"}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{product.status}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    <Typography>
                                                        {product.deliveryTime
                                                            ? product.deliveryTime + " days"
                                                            : "NA"}
                                                    </Typography>
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Grid container>
                                                    <Grid item>
                                                        <Tooltip title="Update Product">
                                                            <IconButton
                                                                size="medium"
                                                                color="primary"
                                                                onClick={() =>
                                                                    handleAddDialogOpen(true, productIndex)
                                                                }
                                                            >
                                                                <Pencil />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>

                                                    <Grid item>
                                                        <Tooltip title="Delete User">
                                                            <IconButton
                                                                size="medium"
                                                                color="secondary"
                                                                onClick={() => deleteProduct(productIndex)}
                                                            >
                                                                <TrashCan />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            {/* <NoData msg="No Product found" isTable={true} /> */}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {manageProductDialog.isOpen && (
                <CustomerDrawer
                    title={
                        manageProductDialog?.data?._id ? "Edit Product" : "Add Product"
                    }
                    handleOpen={true}
                    onClose={() => handleClose()}
                >
                    <ProductForm
                        onClose={handleClose}
                        data={manageProductDialog.data}
                    />
                </CustomerDrawer>
            )}

        </React.Fragment>
    );
};

export default ProductMain;
