export const BASE_URL = process.env.BASE_URL || "https://ykl239vt18.execute-api.ap-south-1.amazonaws.com/prod/v1/"


export const STATUS_DICT: any = {
  0: "Listed(not available for customer)",
  1: "Live(customer can search)",
  "-1": "Not Available Right Now",
};

export const STATUS_DICT_FOR_PRODUCT: any = {
  ...STATUS_DICT,
  "-2": "Out Of Stock",
};

export const PRODUCT_UNIT: any = {
  weight: "Weight",
  piece: "Piece",
  pack: "Pack",
  combo: "Combo",
};
