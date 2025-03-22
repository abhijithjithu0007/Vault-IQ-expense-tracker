import { axiosInstance } from "@/utils/axios";
import Cookies from "js-cookie";

export const loginUser = async (email: string, password: string) => {
  const res = await axiosInstance.post("/user/login", { email, password });

  const data = res.data;
  console.log(data);

  // Cookies.set("token", data.data.token, {
  //   expires: new Date(Date.now() + 86400000),
  //   secure: true,
  // });
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  currency: string
) => {
  const res = await axiosInstance.post("/user/register", {
    name,
    email,
    password,
    currency,
  });

  const data = res.data;
  Cookies.set("token", data.data.token, {
    expires: new Date(Date.now() + 86400000),
    secure: true,
  });
  return data;
};

export const forgotPasswordApi = async (email: string) => {
  const res = await axiosInstance.post("/user/forgot-password", { email });
  return res.data;
};

export const resetPasswordApi = async (password: string, token: string) => {
  const res = await axiosInstance.post("/user/reset-password", {
    token: token,
    newPassword: password,
  });
  return res.data;
};
