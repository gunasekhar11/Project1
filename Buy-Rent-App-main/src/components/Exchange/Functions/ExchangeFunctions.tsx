import { authHeaders, exchange_products, exchange_user_products, headers } from "../../utilities/ApiEndpoints";
import { GetApiCall } from "../../utilities/CommonHTTP";

interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    duration: number;
    location: string;
    images: any;
    product_owner_id:number ;
  }

export const Exchange_Products = () => {
    const products: any = GetApiCall(exchange_products,headers)
    return (products?.data?.data)
}

export const User_Exchange_Products = () => {
    const user_products: any = GetApiCall(exchange_user_products, authHeaders);
    return user_products?.data?.data;
}

export const GetExchangeProductById = (id:any) =>{
    const fetchProducts : any = GetApiCall(exchange_products,headers)
    const products : Product[] = fetchProducts?.data?.data
    if (products) {
      const product = products.find((product) => product.id == id);
      return product || null
    }
  }