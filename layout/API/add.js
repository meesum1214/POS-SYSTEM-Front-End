import { Auth } from "./config";

export const login = async (data) => {
    const response = await Auth.post("/login", data);
    return response;
};

export const register = async (data) => {
    const response = await Auth.post("/register", data);
    return response;
};

export const getAllRoles = async () => {
    const response = await Auth.get("/getallroles");
    return response;
}