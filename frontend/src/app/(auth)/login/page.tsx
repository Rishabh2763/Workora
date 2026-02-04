"use client"
import axios from "axios";
import { useAppData,auth_service } from '@/context/AppContext';

import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const {isAuth,setUser,Loading,setIsAuth} =useAppData();
    if(isAuth) return redirect("/")
    
      const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setBtnLoading(true);
        try {
          const { data } = await axios.post(`${auth_service}/api/auth/login`, {
            email,
            password,
          });
    
          toast.success(data.message);
    
          Cookies.set("token", data.token, {
            expires: 15,
            secure: false,
            path: "/",
          });
          setUser(data.userObject);
          setIsAuth(true);
          fetchApplications();
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
          setIsAuth(false);
        } finally {
          setBtnLoading(false);
        }
      };


  return (
    <div>Login</div>
  )
}

export default Login