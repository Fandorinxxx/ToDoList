import * as AT from "./authTypes";
import axios from "axios";

export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password,
    };
    return (dispatch) => {
        dispatch({
            type: AT.LOGIN_REQUEST,
        });
        axios
            .post("http://localhost:8085/rest/user/authenticate", credentials)
            .then((response) => {
                let token = response.data.token;
                localStorage.setItem("jwtToken", token);
               // localStorage.setItem("email", response.data.name);
                localStorage.setItem("id", response.data.id);
                axios.defaults.headers.common["Authorization"] = token;
                dispatch(success({username: response.data.name, isLoggedIn: true}));

            })
            .catch((error) => {
                dispatch(failure());
            });

    };
};


export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: AT.LOGOUT_REQUEST,
        });
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("email");
        delete  axios.defaults.headers.common["Authorization"];
        dispatch(success(false));
    };
};

const success = (isLoggedIn) => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn,
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false,
    };
};