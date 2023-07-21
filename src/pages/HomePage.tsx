import efetestPrivateApi from "../api/efetestPrivateApi";
import { ModalCrearOrden, ModalInfoOrden, TableOrders } from "../components"
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context";
import { Order, Product } from "../interfaces";
import { Button } from "@material-tailwind/react";


export const HomePage = () => {
  const { rol } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState<{open:boolean,order?:Order}>({open:false,order:undefined});

  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    if(!open) getOrders();
  }, [open])
  

  const getOrders = async () => {
    try{
      const ruta = rol === 1 ? '/Orders' : '/Orders/User';
      const { data } = await efetestPrivateApi.get<{msg:string,data:Order[]}>(ruta);
      setOrders(data.data);
    }catch(err){
      setOrders([]);
    }
  }

  const getProducts = async () => {
    try{
      const { data } = await efetestPrivateApi.get<{msg:string,data:Product[]}>('/Products');
      setProducts(data.data);
    }catch(err){
      setProducts([]);
    }
  }
  

  return (
    <div className="py-5">

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold ">{rol === 1 ? 'Todas las Ordenes' : 'Mis Ordenes'}</h3>
        <Button onClick={()=>setOpen(true)} variant="gradient" color="deep-orange">Crear Orden</Button>
      </div>
      

      <TableOrders orders={orders} showInfo={(order)=>setOpenInfo({open:true,order})} />

      <ModalCrearOrden products={products} open={open} setOpen={setOpen} />
     
      <ModalInfoOrden order={openInfo.order} open={openInfo.open} onClose={()=>setOpenInfo({open:false,order:undefined})} />
      
    </div>
  )
}
