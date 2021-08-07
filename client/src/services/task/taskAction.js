import * as TT from "./taskTypes"
import axios from "axios";

export const saveTask = (task) => {
    return (dispath) => {
        dispath({
            type: TT.SAVE_TASK_REQUEST,
        });
  //   console.log(task)
        axios
            .post("http://localhost:8085/rest/tasks", task)
            .then((responce) => {
                dispath(taskSuccess(responce.data));
            })
            .catch((error) => {
                dispath(taskFailure(error));
            });
    };
};

export const fetchTask = (taskId) => {
    return (dispatch) => {
        dispatch({
            type: TT.FETCH_TASK_REQUEST,
        });
        axios
            .get("http://localhost:8085/rest/tasks/" + taskId)
            .then((responce) => {
                dispatch(taskSuccess(responce.data));
            })
            .catch((error) => {
                dispatch(taskFailure(error));
            });
    };
};

export  const updateTask = (task) =>{
    return (dispatch) =>{
        dispatch ({
            type: TT.UPDATE_TASK_REQUEST,
        });
        axios
            .put("http://localhost:8085/rest/tasks", task)
            .then((response)=>{
                dispatch(taskSuccess(response.data));
            })
            .catch((error)=>{
                dispatch(taskFailure(error));
            });
    };
};

export const deleteTask = (taskId) =>{
    return (dispatch) =>{
        dispatch({
            type: TT.DELETE_TASK_REQUEST,
        });
        axios
            .delete("http://localhost:8085/rest/tasks/" + taskId)
            .then((response)=> {
                dispatch(taskSuccess(response.data));
            })
            .catch((error)=>{
                dispatch(taskFailure(error));
            });
    };
};

const taskSuccess = (task) => {
    return {
        type: TT.TASK_SUCCESS,
        payload:task,
    };
};

const taskFailure = (error) =>{
    return {
        type:TT.TASK_FAILURE,
        payload:error,
    };
};