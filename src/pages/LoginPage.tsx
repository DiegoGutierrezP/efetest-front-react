import { useContext, FormEvent } from 'react';
import { NavLink } from "react-router-dom"
import { Alert, Button, Input, Typography } from "@material-tailwind/react"
import { AuthContext } from "../context"
import { useForm } from "../hooks"

interface LoginForm {
    email:string,
    password:string,
}

type LoginErrors = { [K in keyof LoginForm]?: string };


const validateForm = (form : LoginForm) : LoginErrors => {
    let errors :LoginErrors = {};
    if(!form.email.trim()){
        errors.email = 'El email es requerido'
    }
    if(!form.password.trim()){
        errors.password = 'El password es requerido'
    }
    return errors;
}

export const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const { email,password,form, handleChange,errors,setErrors } = useForm<LoginForm>({
        email:'',
        password:''
    });

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formErrors = validateForm(form);
        setErrors(formErrors);

        if(Object.keys(formErrors).length > 0) return; 

        login(email,password)
        .catch(err => {
            console.log(err.message);
            setErrors({...errors,general:err.message})
        });
    }


  return (
    <div className="m-auto w-full sm:w-[400px] py-5 px-5 bg-white rounded shadow">
        <h2 className="font-medium text-2xl mb-4">Iniciar Sesion</h2>
        <Alert 
            color="orange" variant="ghost" 
            open={!!errors.general}
            onClose={() => setErrors({...errors,general:undefined})}
            animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
            }}
        >
            <span>{errors.general}</span>
        </Alert>
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4 flex flex-col gap-6">
                <div>
                    <Input size="lg" label="Email" type="email" name="email"  onChange={handleChange} value={email} error={!!errors?.email}   />
                    <small className='text-red-500'>{errors?.email}</small>
                </div>
                <div>
                    <Input type="password" name="password" onChange={handleChange} size="lg" label="Password" value={password} error={!!errors?.password} />
                    <small className='text-red-500'>{errors?.password}</small>
                </div>
            </div>
            <Button type="submit" fullWidth className="mt-6" size="md">Entrar</Button>
            <Typography color="gray" className="mt-6 text-sm text-center font-normal">
                No tienes una cuenta?{" "}
                <NavLink
                    to={'/auth/register'}
                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                    Registrate
                </NavLink>
            </Typography>
        </form>
    </div>
  )
}
