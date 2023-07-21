import { FC } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, List, ListItem, ListItemSuffix, Option, Select } from "@material-tailwind/react";
import { Product } from '../interfaces';
import { useForm } from '../hooks';
import efetestPrivateApi from '../api/efetestPrivateApi';

interface Props {
    products : Product[],
    open:boolean,
    setOpen:(val:boolean)=>void
}

interface Form {
    shippingAddress : string,
    products :Array<{
        productId : number,
        productName : string,
        quantity : number,
        totalPrice :number
    }>,

    selectProduct? : number,
    selectProductQuantity? : number,
}

const initialForm : Form = {
    shippingAddress : '',
    products : []
}

export const ModalCrearOrden:FC<Props> = ({products,open,setOpen}) => {
    const {form,setForm, handleChange,onResetForm} = useForm<Form>(initialForm);

    const handleClose = () => {
        onResetForm();
        setOpen(false)
    }

    const onAddProduct = () => {
        const product = products.find(p => p.id === form.selectProduct);
        if(product){
            let cantidad = form.selectProductQuantity;
            let formProducts = form.products;
            const existProductInForm = formProducts.find(x => x.productId == product.id);
            setForm({
                ...form,
                products : existProductInForm ? formProducts.map(fp => {
                    if(fp.productId === product.id){
                        const newQuantity = Number(fp.quantity) + Number(cantidad || 1);
                        return { 
                            ...fp, 
                            quantity : newQuantity,
                            totalPrice : newQuantity * product.price,
                        }
                    }
                    return fp;
                }) : [...form.products, {
                    productId: product.id,
                    productName: product.name,
                    quantity : cantidad || 1,
                    totalPrice : product.price * (cantidad || 1),
                }]
            })
        }
    }

    const onDeleteProduct = (idx : number) => {
        let productos = form.products;
        productos.splice(idx,1)
        setForm({...form,products:productos})
    }

    const onCreateOrder = async () => {
        try{
            const {data} = await efetestPrivateApi.post('/Orders/',form);
            console.log(data);
            handleClose();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Dialog
            open={open}
            size={"md"}
            handler={setOpen}
        >
            <DialogHeader>Crear Orden</DialogHeader>
            <DialogBody divider>
                <div className="flex flex-col gap-6  box-border">
                    <Input label="Direccion de Envio" name='shippingAddress' onChange={handleChange} value={form.shippingAddress} />

                    <div className="flex gap-2  box-border w-full">
                        <div className="flex-1">
                            <Select className="" label="Selecciona un Producto" name='selectProduct' onChange={(val)=>setForm({...form,selectProduct:Number(val)})} >
                                {products.map((p) => (
                                    <Option key={p.id} value={`${p.id}`} >{`${p.name} - S/${p.price}`}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="">
                            <Input label="Cantidad" type="number" name='selectProductQuantity' onChange={handleChange} />
                        </div>
                    </div>
                    <Button onClick={onAddProduct}>Agregar</Button>

                    <List>
                        {
                            form.products.map((fp,idx) => (
                                <ListItem key={idx} ripple={false} className="py-1 pr-1 pl-4">
                                    {fp.productName} - {fp.quantity} - S/{fp.totalPrice}
                                    <ListItemSuffix>
                                        <IconButton onClick={()=>onDeleteProduct(idx)} variant="text" color="blue-gray">
                                            <svg className='w-5 h-5' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </IconButton>
                                    </ListItemSuffix>
                                </ListItem>
                            ))
                        }
                        
                    </List>

                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={onCreateOrder}
                >
                    <span>Crear</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}