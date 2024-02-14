import React from 'react'
import Cookies from 'universal-cookie';
import { logined_user, authHeaders , exchange_products, headers, exchange_user_products, allusers} from './ApiEndpoints';
import { GetApiCall  } from './CommonHTTP';

interface User {
    id: number;
    username: string;
}

export const GetUserById = (id:number) =>{
  const users : User[] = GetAllUsers()
  if (users) {
    const user = users.find((user) => user.id === id);
    if (user) {
      return user.username;
    }
    return null
  }
}

export const GetAllUsers = () => {
  const fetchUsers : any = GetApiCall(allusers,headers)
  const users = fetchUsers?.data?.data
  return users || null
}

export const getAuthToken : any= () => {
  const cookies = new Cookies();
  const tokenFromCookies = cookies.get("jwt_authorisation");
  const authToken = tokenFromCookies ? tokenFromCookies : null;
  return authToken;
};

export const getAuthName = () => {
  const token = getAuthToken()
  if (token) {
    const user : any = GetApiCall(logined_user,authHeaders)
    return (user?.data?.data?.username)
  }else{
    return null;
  }
}
  

export const Logout = () => {
  const cookies = new Cookies();
  cookies.remove("jwt_authorisation");
};

