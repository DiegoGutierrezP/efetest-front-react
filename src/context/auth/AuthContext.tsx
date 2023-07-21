import { FC, PropsWithChildren, useState, createContext, useEffect } from 'react';
import efetestApi from '../../api/efetestApi';
import { AuthUser } from '../../interfaces';

type AuthStatus = 'authenticated' | 'no-authenticated'  |  'checking';

interface ContextProps extends AuthUser { 
    status : AuthStatus,
    login : (email:string,password:string)=> Promise<boolean>,
    logout: () => void
}

const AuthContext = createContext({} as ContextProps);

const initialAuthUser : AuthUser = {
    id: undefined,
    email:'',
    name: '',
    rol:1,
    token:'',
    refreshToken:''
}

const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const [status, setStatus] = useState<AuthStatus>('no-authenticated')
    const [user, setUser] = useState<AuthUser>(initialAuthUser)

    useEffect(() => {
   
      const userStore : AuthUser = JSON.parse(localStorage.getItem('efetest-user') || '{}');

      if(userStore.token && userStore.refreshToken){
        //obtenes la info del usuario actualizada
        refrescarToken(userStore.token,userStore.refreshToken);
      }else{
        logout();
      }

      /* if((Object.values(userStore).filter(x => !!x).length === 5) && userStore.token && userStore.refreshToken){
        
        // const user = jwtDecode(userStore.token) as any;
        // const isExpired = moment.unix(user.exp).isBefore(moment());
        // console.log('TOKEN EXPIRADO CONTEXT',isExpired);
        // if(isExpired){
        //     refrescarToken(userStore.token,userStore.refreshToken);
        // }else{
        //     setStatus('authenticated');
        //     setUser(userStore);
        // } 
      }else{
        logout();
      } */
    }, [])

    useEffect(() => {

        function checkUserData() {
            const userStore : AuthUser = JSON.parse(localStorage.getItem('efetest-user') || '{}');
            if((Object.values(userStore).filter(x => !!x).length === 5) && userStore.token && userStore.refreshToken){
                setUser(userStore);
                setStatus('authenticated')
            }
        }

        window.addEventListener('storage', checkUserData);
    
        return () => window.removeEventListener('storage', checkUserData);
    }, [])
    
    
    

    const login = async (email:string,password:string) => {
        setStatus('checking')
        try{
            const {data} = await efetestApi.post(`/Auth/Login`,{email,password})
            const infoUser = data.data;
            
            setUser(infoUser as AuthUser);
            setStatus('authenticated')

            localStorage.setItem('efetest-user',JSON.stringify(infoUser));

            return true;
        }catch(err : any){
            console.log(err);
            setStatus('no-authenticated')
            localStorage.removeItem('efetest-user');
            throw new Error(err.response?.data?.Message || 'Ocurrio un error');
        }
    }

    const refrescarToken = async (token:string,refreshToken : string)=>{
        try{
            const {data} = await efetestApi.post(`/Auth/RefreshToken`,{token,refreshToken})
            const infoUser = data.data;
            
            setUser(infoUser as AuthUser);
            setStatus('authenticated')

            localStorage.setItem('efetest-user',JSON.stringify(infoUser));

            return true;
        }catch(err : any){
            console.log(err);
            logout();
            throw new Error(err.response?.data?.Message || 'Ocurrio un error');
        }
    } 

    const logout = () => {
        setStatus('no-authenticated')
        localStorage.removeItem('efetest-user');
        //window.location.reload();
    }

    return (
        <AuthContext.Provider
          value={{
            ...user,
            status,

            //methods
            login,
            logout
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}

export {
    AuthProvider,
    AuthContext
};