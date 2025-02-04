import { axiosInstance } from "@/utils/axios";

export const getUserDetails = async () => {
  const res = await axiosInstance.get("/user/user-profile");
  return res.data;
};
