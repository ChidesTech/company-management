import axios from "axios";

const http = axios.create({
    // baseURL : "http://localhost:5000/api",
    baseURL : "https://company-management-server-x7nt.onrender.com/api",
    headers : {
        "Content-Type" : "application/json"
    }
    
});

export default http;