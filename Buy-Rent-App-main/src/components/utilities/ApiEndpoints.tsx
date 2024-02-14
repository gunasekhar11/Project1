import Cookies from "universal-cookie";

//Base Url
export const Baseurl = "https://buyrent-be.maangtechnologies.com/";
export const Payment_Baseurl = "https://payment-be.maangtechnologies.com/";
// export const Baseurl = "http://3.111.179.24:9000/";

//Login Urls
export const sign_up = Baseurl + "auth/create/user"
export const sign_in = Baseurl + "auth/token"
export const Google_Auth = Baseurl + "api/fang/social-login"

//exchange feature endpoints
export const allusers = Baseurl + "exchange/all_users";
export const current_user = Baseurl +"users/";
export const logined_user = Baseurl + "exchange/";
export const exchange_user_products = Baseurl + "exchange/products"; 
export const exchange_sent_requests = Baseurl + "exchange/exchange/sent_requests/";
export const exchange_received_requests = Baseurl + "exchange/exchange/received_requests/";
export const exchange_products = Baseurl + "exchange/listed_products";
export const post_exchange_request = Baseurl + "exchange/exchange/requests/";
export const accept_request = Baseurl + "exchange/exchange/received_requests/"

//rental feature endpoints
export const rental_products = Baseurl + "rental/rental_products";
export const rental_product_reviews = Baseurl + "product/reviews";
export const rental_product_ratings  = Baseurl +"product/get_product_ratings";
export const rental_request = Baseurl +"requests/rental_request";
export const rental_add_product =Baseurl +"rental/create_rental_product";
export const rental_sent_requests = Baseurl +"requests/rental/sent_requests";
export const rental_received_requests = Baseurl +"requests/rental/received_requests";


//buy feature endpoints
//products
export const buy_old_products = Baseurl + "users/products/all/old_to_new";
export const buy_new_products = Baseurl + "users/products/all/new_to_old";
export const buy_add_product = Baseurl +"users/post_product";
export const buy_listed_products = Baseurl +"users/listed_products";
export const buy_product_ratings = Baseurl + "cart/get_product_ratings/";
//wishlist
export const buy_wishlist_products = Baseurl + "wishlist/get_products";
export const buy_addTo_wishlist = Baseurl + "wishlist/add_product/";
export const buy_removeFrom_wishlist = Baseurl + "wishlist/delete_product/";
//cart
export const buy_cart_products = Baseurl + "cart/get_products";
export const buy_addTo_Cart = Baseurl + "cart/add_product/";
export const buy_removeFrom_cart = Baseurl + "delete_product/";

//Payment
export const creat_order = Baseurl + "create_order"
export const transactions_url = Baseurl + "wallet_hisotry"


//Common Headers
export const headers = {
    'accept': 'application/json',
    "Content-Type": "application/json",
}

//Handling the Cookies
const cookies = new Cookies();
const tokenFromCookies = cookies.get("jwt_authorisation");
const authToken = "Bearer ".concat(tokenFromCookies);

//AuthHeaders
export const authHeaders = {
    'accept': 'application/json',
    "Content-type": "application/json",
    'Authorization': authToken
};
