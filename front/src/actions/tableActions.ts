import {getVariableInfo, getVariables} from "../services/app.service";
import { FETCH_ROWS, FETCH_VARIABLES, UPDATE_CURRENT_VARIABLE } from "./types";

export const fetchTableData = (variable) => async (dispatch) => {
  try {
    const newRows: Array<{
      value: string,
      count: number,
      averageAge: string}> = await getVariableInfo(variable);
    dispatch({
      data: newRows,
      type: FETCH_ROWS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchVariables = () => async (dispatch) => {
  try {
    const variables: string[] = await getVariables();
    dispatch({
      data: variables,
      type: FETCH_VARIABLES,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentVariable = (variable) => (dispatch) => {
  dispatch({
    data: variable,
    type: UPDATE_CURRENT_VARIABLE,
  });
};
