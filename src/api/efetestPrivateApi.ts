

import axios from "axios";
import { AuthUser } from "../interfaces";
import jwtDecode from "jwt-decode";
import moment from "moment";

const BASE_URL = import.meta.env.VITE_EFETEST_API;

export const controllerPrivateApi = new AbortController();

 const efetestPrivateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
}) 

efetestPrivateApi.interceptors.request.use(async (config) => {
    try{
        const userStore = JSON.parse(localStorage.getItem('efetest-user') || '{}') as AuthUser;
        const {token, refreshToken} = userStore;
        if(token && refreshToken){
            config.headers.Authorization = `Bearer ${token}`;
            
            const user = jwtDecode(token) as any;
            const isExpired = moment.unix(user.exp).isBefore(moment());

            console.log('TOKEN EXPIRADO ', isExpired)
    
            if(!isExpired){
                return config;
            } 
        
            const {data} = await axios.post(`${BASE_URL}/Auth/RefreshToken`,{token, refreshToken})
            const infoUser : AuthUser = data.data;
            console.log('TOKEN ACTUALIZADO ',infoUser);

            config.headers.Authorization = `Bearer ${infoUser.token}`;


            localStorage.setItem('efetest-user',JSON.stringify(infoUser));
            window.dispatchEvent(new Event('storage'));
            
        }else{
            controllerPrivateApi.abort('Cancel request inside interceptor')
        }
    
        
    }catch(err){
        localStorage.removeItem('efetest-user');//esto indica que debe desloguearse
        window.dispatchEvent(new Event('storage'));

        console.error('ERROR EN INTERCEPTOR AXIOS '+ err)
        controllerPrivateApi.abort('Cancel request inside interceptor '+ err)
    }

    return config;
})

export default efetestPrivateApi;