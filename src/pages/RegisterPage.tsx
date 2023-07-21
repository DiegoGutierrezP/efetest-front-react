import { Alert, Button, Input, Typography } from "@material-tailwind/react"
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "../hooks";
import { FormEvent, useState } from 'react';
import efetestApi from "../api/efetestApi";


interface FormRegister {
    name:string,
    fullname:string,
    email:string,
    password:string
}

type RegisterErrors = { [K in keyof FormRegister]?: string };

const validateForm = (form : FormRegister) : RegisterErrors => {
    let errors : RegisterErrors = {};
    if(!form.name.trim()){
        errors.name = 'El nombre es requerido'
    }
    if(!form.fullname.trim()){
        errors.fullname = 'El apellido es requerido'
    }
    if(!form.email.trim()){
        errors.email = 'El email es requerido'
    }
    if(!form.password.trim()){
        errors.password = 'El password es requerido'
    }
    return errors;
}

export const RegisterPage = () => {
    const [msgErrApi, setMsgErrApi] = useState('')
    const { form, handleChange,errors,setErrors } = useForm<FormRegister>({
        name:'',
        fullname:'',
        email:'',
        password:''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErrors({});

        const formErrors = validateForm(form);
        setErrors(formErrors);

        if(Object.keys(formErrors).length > 0) return; 

        console.log(form);
        
        try{
            await efetestApi.post(`/Auth/Register`,form);
            navigate('/auth/login');
        }catch(err : any){
            console.log(err);
            setMsgErrApi(err.response?.data?.Message || 'Ocurrio un error');
        }
    }

  return (
    <div className="m-auto w-full sm:w-[400px] py-5 px-5 bg-white rounded shadow">
        <h2 className="font-medium text-2xl mb-4">Registrate</h2>
        <Alert 
            color="orange" variant="ghost" 
            open={!!msgErrApi}
            onClose={() => setMsgErrApi('')}
            animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
            }}
        >
            <span>{msgErrApi}</span>
        </Alert>
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4 flex flex-col gap-6">
                <div>
                    <Input size="lg" label="Nombres" name="name" onChange={handleChange} value={form.name}  error={!!errors?.name} />
                    <small className="text-red-500">{errors.name}</small>
                </div>
                <div>
                    <Input size="lg" label="Apellidos" name="fullname" onChange={handleChange} value={form.fullname}  error={!!errors?.fullname} />
                    <small className="text-red-500">{errors.fullname}</small> 
                </div>
                <div>
                    <Input size="lg" label="Email" name="email" onChange={handleChange} value={form.email}  error={!!errors?.email} />
                    <small className="text-red-500">{errors.email}</small>
                </div>
                <div>
                    <Input type="password" size="lg" label="Password" name="password" onChange={handleChange} value={form.password}  error={!!errors?.password} />
                    <small className="text-red-500">{errors.password}</small>
                </div>
            </div>
            <Button type="submit" fullWidth className="mt-6" size="md">Registrarse</Button>
            
        </form>

        <Typography color="gray" className="mt-6 text-sm text-center font-normal">
                Ya tienes una cuenta?{" "}
                <NavLink
                    to={'/auth/login'}
                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                    Iniciar Sesion
                </NavLink>
            </Typography>
    </div>
  )
}
