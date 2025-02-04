import { axiosInstance } from "@/utils/axios";

export const getUserDetails = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};
