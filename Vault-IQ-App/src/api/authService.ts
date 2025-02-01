import { axiosInstance } from "@/utils/axios";
import Cookies from "js-cookie";

export const loginUser = async (email: string, password: string) => {
  const res = await axiosInstance.post("/login", { email, password });

  const data = res.data;
  Cookies.set("token", data.data.token, { expires: 1, secure: true });
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axiosInstance.post("/user/register", {
    name,
    email,
    password,
  });

  const data = res.data;
  Cookies.set("token", data.data.token, { expires: 1, secure: true });
  return data;
};
