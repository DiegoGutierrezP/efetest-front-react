import { ChangeEvent, useState } from "react";

type FormErrors<T> = { [K in keyof T]?: string } & {general? : string};

export const useForm = <T extends object>(initState:T) => { //funcion flecha
    const [errors, setErrors] = useState<FormErrors<T>>({}); //cambiamos las propiedades de la interfas a string
    const [form, setForm] = useState<T>(initState);

    const handleChange = (ev:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = ev.target;
        
        setForm({
            ...form,
            [name]:value
        })
    }

    const onResetForm = () => {
        setForm(initState);
    }

  return { 
        ...form,
        form,
        errors,
        setForm,
        setErrors,
        handleChange ,
        onResetForm
    }
}