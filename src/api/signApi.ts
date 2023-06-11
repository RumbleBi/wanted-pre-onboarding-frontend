import axios, { AxiosResponse } from "axios";
import { api } from "./config";
import { ISignApi, ISignRes } from "../types/types";

export const signUp = async (data: ISignApi): Promise<AxiosResponse<ISignRes>> => {
  try {
    const response = await api.post("auth/signup", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};

export const signIn = async (data: ISignApi): Promise<AxiosResponse<ISignRes>> => {
  try {
    const response = await api.post("auth/signin", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      throw response?.data.message;
    }
    console.log(e);
    throw e;
  }
};
