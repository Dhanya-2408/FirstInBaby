
import {
  addressEndpoints,
  authEndpoints,
  CartEndpoints,
  FavEndpoints,
  homeEndpoints,
  navEndpoints,
  paymentEndpoints,
  productsEndpoints,
  profileEndpoints,
  subscripeEndpoints,
} from "./axiosEndpoints";

export const authService = {
  Register: {
    method: "POST",
    url: authEndpoints.REGISTER,
  },
  Login: {
    method: "POST",
    url: authEndpoints.LOGIN,
  },
  ForgorPassword: {
    method: "POST",
    url: authEndpoints.FORGOT_PASSWORD,
  },
  ConfirmOtp: {
    method: "POST",
    url: authEndpoints.CONFIRM__OTP,
  },
  ResetPassword: {
    method: "POST",
    url: authEndpoints.RESET_PASSWORD,
  },
};

export const navService = {
  Maincategory: {
    method: "GET",
    url: navEndpoints.MAIN__CATEGORY,
  },
};

export const homeService = {

  getHotDealsCollection: {
    method: "GET",
    url: homeEndpoints.HOT_DEALS_COLLECTION,
  },

  getShopByCollection: {
    method: "GET",
    url: homeEndpoints.SHOP_BY_COLLECTION,
  },
  getShopByProducts: {
    method: "GET",
    url: homeEndpoints.SHOP_BY_PRODUCTS,
  },
 
  getHotSaleCollection: {
    method: "GET",
    url: homeEndpoints.HOT_SALE_COLLECTION,
  },
  getFeaturedCollection: {
    method: "GET",
    url: homeEndpoints.FEATURED_COLLECTION,
  },
  getInstaFeedCollection: {
    method: "GET",
    url: homeEndpoints.INSTAFEEDS_COLLECTION,
  },
  getALLProducts: {
    method: "GET",
    url: homeEndpoints.HOMESCREEN_PRODUCTS,
  },
  getProductsHot: {
    method: "GET",
    url: homeEndpoints.HOT,
  },
  getFeatureProducts: {
    method: "GET",
    url: homeEndpoints.FEATURE,
  },
  getInstaFeedProducts: {
    method: "GET",
    url: homeEndpoints.HOT,
  },
};

export const productService = {
  getAllProducts: {
    method: "GET",
    url: productsEndpoints.ALL_PRODUCTS,
  },
  getProductsByCategory: {
    method: "GET",
    url: productsEndpoints.PROUCTS_By_CATEGORY,
  },
  getFiltersByCategory: {
    method: "GET",
    url: productsEndpoints.FILTERS_By_CATEGORY,
  },
  getProductsByCollection: {
    method: "GET",
    url: productsEndpoints.PRODUCTS_BY_SHOPByCOLLECTION,
  },
  getPreOrderProducts: {
    method: "GET",
    url: productsEndpoints.PREORDER,
  },
  getSearch: {
    method: "GET",
    url: productsEndpoints.SEARCH_PRODUCTS,
  },
  singleProduct: {
    method: "GET",
    url: productsEndpoints.SINGLE_PRODUCT,
  },
  verifyDelivery: {
    method: "GET",
    url: productsEndpoints.DELIVERY_STATUS,
  },
  getReviews: {
    method: "GET",
    url: productsEndpoints.GET_REVIEWS,
  },
  addReviews: {
    method: "POST",
    url: productsEndpoints.ADD_REVIEWS,
  },
};

export const favService = {
  getFavourites: {
    method: "GET",
    url: FavEndpoints.GET_FAV,
  },
  addFavourites: {
    method: "POST",
    url: FavEndpoints.ADD_FAV,
  },
  deleteFavourites: {
    method: "POST",
    url: FavEndpoints.DELETE_FAV,
  },
};

export const cartService = {
  addCart: {
    method: "POST",
    url: CartEndpoints.ADD_CART,
  },
};

export const profileService = {
  getCustomerbyIdEmail: {
    method: "GET",
    url: profileEndpoints.GET_PROFILE,
  },
  updateCustomer: {
    method: "POST",
    url: profileEndpoints.UPDATE_PROFILE,
  },
  help: {
    method: "POST",
    url: profileEndpoints.HELP,
  },
  plans: {
    method: "GET",
    url: profileEndpoints.PLANS,
  },
  getSubscription: {
    method: "GET",
    url: profileEndpoints.SUBCRIPTION,
  },
  updateSubscriptionPlan: {
    method: "POST",
    url: profileEndpoints.UPDATE_SUBCRIPTION,
  },
  getOrder: {
    method: "GET",
    url: profileEndpoints.GET_ORDER,
  },
  placeOrder: {
    method: "POST",
    url: profileEndpoints.PLACE_ORDER,
  },
  updateOrder: {
    method: "POST",
    url: profileEndpoints.UPDATE_ORDER,
  },
};

export const paymentService = {
  stripePay: {
    method: "POST",
    url: paymentEndpoints.STRIPE,
  },
};

export const addressService = {
  getAddress: {
    method: "GET",
    url: addressEndpoints.GET_ADDRESS,
  },
  addAddress: {
    method: "POST",
    url: addressEndpoints.ADD_ADDRESS,
  },
  deleteAddress: {
    method: "POST",
    url: addressEndpoints.DELETE_ADDRESS,
  },
  updateAddress: {
    method: "POST",
    url: addressEndpoints.UPDATE_ADDRESS,
  },
};

export const subscriptionService = {
  newsLetter: {
    method: "POST",
    url: subscripeEndpoints.NEWSLETTER,
  },
};
