import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, List, ListItem } from "@material-tailwind/react";
import { Order } from "../interfaces";
import { FC } from 'react';

interface Props {
    order? : Order,
    open:boolean,
    onClose:()=>void
}

export const ModalInfoOrden:FC<Props> = ({order,open,onClose}) => {
  return (
    <Dialog
            open={open}
            size={"md"}
            handler={onClose}
        >
            <DialogHeader>Info Orden</DialogHeader>
            <DialogBody divider>
                <Input readOnly value={order?.shippingAddress} label="Direccion de envio" />
                <List className="mt-3">
                    {
                        order?.items.map((it,idx) => (
                            <ListItem key={idx} ripple={false} className="py-3 pr-1 pl-4">
                                {it.productName} - {it.quantity} - S/{it.totalPrice}
                            </ListItem>
                        ))
                    }
                    <></>
                </List>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                
            </DialogFooter>
        </Dialog>
  )
}
