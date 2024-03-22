export interface IStandardAPIResponse<T = any> {
  [x: string]: any;
  success: String;
  message: string;
  data: T;
}

interface Document {
  _id?: string;
}

export interface ClassProps {
  classes?: any;
  theme?: any;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISelectMenuList {
  value: string | number;
  label: string | number;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  regType?: string; // admin , web, mobile
  gender?: string;
  dob?: Date;
  phone: string;
  password?: string;
  isEnabled?: boolean;
  isDeleted?: boolean;
  roleId: number; // 0-admin, 1-customer;
  regForm?: string; // manual , google, fb
}

export interface IUserSearchObj {
  offset?: number;
  limit?: number;
  roleId?: number;
  name?: string;
  userId?: string;
  email?: string;
  search?: string;
  isEnabled?: any;
  regForm?: string;
  isExport?: boolean;
  timePeriod?: string;
  startDate?: string;
  endDate?: string;
  // showPagination?: boolean;
}

export interface ITokenData {
  isEnabled: boolean;
  isDeleted: boolean;
  roleId: number;
  _id: string;
  firstName: string;
  lastName: string;
  name?: string
  middleName: string;
  email: string;
  phone: string;
  gender: string;
  regType: string;
  id: string;
  iat: number;
  exp: number;
}

export interface IUserAddress extends Document {
  userId: string;
  name: string;
  phone: string;
  pincode: any;
  area: string;
  addressLine1: string;
  additionalInfo: string;
  city: string;
  state?: string;
  landMark: string;
  alternatePhone: string;
  addressType: string; // home, work
  // location: {
  //   type: string;
  //   coordinates: Array<number>;
  // };
  isDeleted: boolean;
}



export interface ICategory extends Document {
  title: string;
  slug: string;
  image: string;
  imageUrl?: string;
  isDeleted: boolean;
  // isEnabled?: boolean;
  deletedImage?: string;
  description?: string;
  status: number; // 0 => listed but not available for customer, 1 => live[customer can search], -1 => Not available right now
  // deliveryTime?: string;
  // dontAllowToOrderWithOtherCat?: boolean;
  isShowInAppDashBoard?: boolean;
}

export interface ICategorySearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: string;
  search?: string;
  // isEnabled?: any;
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
  isExport?: boolean;
}

export interface ISubCategory extends Document {
  categoryId: string;
  title: string;
  slug: string;
  subTitle?: string;
  image: string;
  imageUrl?: string;
  isDeleted: boolean;
  // isEnabled?: boolean;
  deletedImage?: string;
  description?: string;
  status: number; // 0 => listed but not available for customer, 1 => live[customer can search], -1 => Not available right now
}

export interface ISubCategorySearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: string;
  subCategoryId?: string;
  search?: string;
  // isEnabled?: any;
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
  isExport?: boolean;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  slug: string;
  imageUrl: string
  isAvailable: boolean;
  isDeleted: boolean;
  mrp: number;
  sellingPrice: number;
  manufacturer: string;
  brand: string;
  category: string;
  priceUnit: string;
  noOfBurner: number;
  unitLabel: string;
  materialType: string;
  ignitionType: string;
  knobsType: string;
  warranty: string;
  status: number;
  deliveryTime: number;
}

export interface IProductOptions extends Document {
  images?: Array<string>;
  imagesUrl?: Array<string>;
  // isDeleted?: boolean;
  mrp: number;
  sellingPrice: number;
  priceUnit: string; // weight, piece, pack, combo
  unitLabel: string;
  // unitLabel2: string;
  productId?: string;
}

export interface IProductSearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  subCategoryIds?: string[];
  productId?: string;
  search?: string;
  // isEnabled?: any;
  categoryIds?: [];
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
  isExport?: boolean;
}

export interface IBanner extends Document {
  title: string;
  slug: string;
  image: string;
  imageUrl?: string;
  isDeleted: boolean;
  bannerPosition?: number;
  // isEnabled?: boolean;
  deletedImage?: string;
  description?: string;
  status: number; // 0 => listed but not available for customer, 1 => live[customer can search], -1 => Not available right now
}

export interface IBannerSearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  search?: string;
  // isEnabled?: any;
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
}

export interface ILocationGroup extends Document {
  title: string;
  locations: Array<{ title: string; pincode: string }>;
  status: number; // 0 => listed but not available for customer, 1 => live[customer can search], -1 => Not available right now
  isDeleted: boolean;
}

export interface ILocationGroupSearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  locationGroupId?: string;
  search?: string;
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
  isExport?: boolean;
}

export interface IHomeFeed extends Document {
  title: string;
  productIds: Array<string>;
  status: number; // 0 => listed but not available for customer, 1 => live[customer can search], -1 => Not available right now
}

export interface IHomeFeedSearchObj {
  offset?: number;
  limit?: number;
  title?: string;
  search?: string;
  status?: number;
  // showPagination?: boolean;
  showAllData?: boolean;
}

export interface IOrder extends Document {
  products: Array<{
    productId: string;
    optionId: string;
    quantity: number;
    buyingPriceRate: number;
    effectivePriceRate: number;
    totalEffectivePrice: number;
    totalPrice: number;
    priceUnit: string; // weight, piece, pack, combo
    unitLabel: string;
    imageUrl: string;
    title: string;
    subCategories: Array<{ _id: string; title: string }>;
  }>;
  orderNo: string;
  paymentMethod: "cash" | "card" | "upi";
  totalPrice: number;
  totalItem: number;
  totalEffectivePrice: number;
  deliveryCharge: number;
  effectiveDeliveryCharge: number;
  billingAddress?: IUserAddress;
  shippingAddress: IUserAddress;
  isBillingAddressSameAsShipping: boolean;
  // paymentId: string;
  deliveryVerificationCode: string;
  deliveryVerificationStatus: number; // 0 => initial state, 1 => verified, -1 => not verified
  userId: string; // customer userId
  deliveredBy: string; // userId of delivery boy
  deliveryBoyApprovalStatus: number;
  assignedForDeliveryTo: string; // userId of delivery boy
  /**
   * List of status
   * 0 => initiated for order,
   * 1 => order placed successfully,
   * -1 => failed to order,
   * 2 => order delivered to customer,
   * -2 => customer refused the order,
   * -3 => cancelled by customer
   * -4 => cancelled by admin
   * 5 => order approved
   * -5 order rejected
   * 6 order in progress
   * 7 Picked up from seller
   */
  status: number;
  remarks?: string;
  orderTime: Date;
  pickedUpTime: Date;
  deliveredTime: Date;
  createdAt: Date;
  paymentDetail: IPayment;
  userName: string;
}

export interface IOrderSearchObj {
  offset: number;
  limit: number;
  search?: string;
  userName?: string;
  // userId?: string;
  status?: number;
  // orderId?: string;
  paymentMethod?: string;
  deliveredBy?: string;
  deliveryVerificationStatus?: number;
  timePeriod?: string;
  startDate?: string;
  endDate?: string;
}

export interface IOrderDashboardSearch {
  timePeriod?: string;
  startDate?: string;
  endDate?: string;
}

export interface IPayment extends Document {
  paymentMethod: "cash" | "card" | "upi";
  paymentType: "sale";
  paymentMeta?: Object; // response received from razor pay or any payment gateway.
  amount: number;
  serviceFees: number;
  paymentStatus: "pending" | "approved" | "rejected" | "received";
  transactionId?: string;
  remarks?: string;
  userId: string;
  invoiceNo: string;
  orderId: string;
}

export interface IDashboardData {
  totalCustomer: number;
  totalCategory: number;
  totalProduct: number;
  totalOrder: number;
  totalLocationGroup: number;
  totalHomeFeed: number;
  users: Array<{ _id: number; count: number }>;
  categories: Array<{ _id: number; count: number }>;
  products: Array<{ _id: number; count: number }>;
  orderStatus: Array<{ _id: number; count: number }>;
  deliveryStatus: Array<{ _id: number; count: number }>;
}

export interface IOrderDashboardData {
  orderStatus: Array<{ _id: number; count: number }>;
  paymentDetails: Array<IDashboardPaymentData>;
  userCountData: Array<{ _id: number; count: number }>;
}

export interface IDashboardPaymentData {
  _id: string;
  totalPrice: number;
  totalDeliveryCharge: number;
}



export interface IShop {
  name: string;
  shopId: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail: string
  ownerContact: string
  address: string
  photoUrl: string
  password: string
  _id?: string;

}
