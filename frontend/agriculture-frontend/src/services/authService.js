import api from "./api";

export const loginUser = async (mobileNumber, password) => {
  const response = await api.post("/auth/login", {
    mobileNumber,
    password,
  });
  return response.data;
};