// import axios from "axios";
import * as axios from "../__mocks__/axios";
import { API_URL } from "../config";

export const getVariables = async () => {
  try {
    return await axios.get(API_URL);
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getVariableInfo = async (variable: string) => {
  try {
    const response =  await axios.post(API_URL, {
      column: variable,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};
