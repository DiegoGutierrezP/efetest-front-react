import axios from "axios";

 const efetestApi = axios.create({
    baseURL: import.meta.env.VITE_EFETEST_API,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
}) 

export default efetestApi;