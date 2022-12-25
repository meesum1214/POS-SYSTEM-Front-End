import axios from "axios";

export const Auth = axios.create({
    baseURL: "http://localhost:8081/api/auth",
});