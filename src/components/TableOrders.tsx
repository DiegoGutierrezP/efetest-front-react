import { Card, Chip, IconButton, Typography } from "@material-tailwind/react";
import { Order } from "../interfaces";
import { FC } from 'react';
import moment from "moment";

const TABLE_HEAD = ["","Usuario","Direccion de Envio", "Fecha de la Orden", "Total","Estado",""];

interface Props {
    orders : Order[],
    showInfo : (order:Order)=>void,
}

export const TableOrders:FC<Props> = ({orders,showInfo}) => {
  return (
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head,idx) => (
              <th key={idx} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {index + 1}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.user?.name} {order.user?.fullName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.shippingAddress}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {moment(order.orderDate).format('YYYY-MM-DD hh:mm:ss')}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    S/ {order.totalAmount}
                  </Typography>
                </td>
                <td className={classes}>
                    <Chip color="yellow" className="w-fit" value={order.status === 1 && 'Pendiente'} />
                </td>
                <td className={classes}>
                    <IconButton onClick={()=>showInfo(order)} variant="text" >
                        <svg fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  )
}
