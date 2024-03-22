import { httpClient } from "../Common/Service";
import { IStandardAPIResponse, IProduct } from "../vm";

export const addAProduct = async (
    product: IProduct
): Promise<IStandardAPIResponse<any>> => {
    try {
        let res = await httpClient(`product/add`, "PUT", product);
        return res;
    } catch (err: any) {
        return err;
    }
};

export const updateAProduct = async (
    product: IProduct
): Promise<IStandardAPIResponse<any>> => {
    try {
        let res = await httpClient(
            `products/${product._id}`,
            "PATCH",
            product
        );
        return res;
    } catch (err: any) {
        return err && err.response ? err.response.data : undefined;
    }
};

export const deleteAProduct = async (
    productId: string
): Promise<IStandardAPIResponse<any>> => {
    try {
        let res = await httpClient(`products/${productId}`, "DELETE");
        return res;
    } catch (err: any) {
        return err && err.response ? err.response.data : undefined;
    }
};

export const getProducts = async (): Promise<IStandardAPIResponse<Array<IProduct>>> => {
    try {
        let res = await httpClient(`products/all`, "GET");
        return res;
    } catch (err: any) {
        return err && err.response ? err.response.data : undefined;
    }
};

