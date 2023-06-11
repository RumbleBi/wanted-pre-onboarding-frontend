import axios from "axios";
import api from "./config";

export const signUp = async (email: string, password: string) => {
  try {
    const response = await api.post("auth/signup", {
      email,
      password,
    });
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post("auth/signin", {
      email,
      password,
    });
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
  }
};
