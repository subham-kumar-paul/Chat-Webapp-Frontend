
import React from 'react'
import  {AxiosRequestHeaders}  from "axios";

export default function authHeader():Record<string, string> {
  
  const localstorageUser = localStorage.getItem("user");
  if (!localstorageUser) {
    return {};
  }
  const user = JSON.parse(localstorageUser);
  if (user && user.token) {
    return { Authorization: `Token ${user.token}` };
  }
  
  return {};
}







