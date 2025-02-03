import { FC } from "react";
import { IOrderCollection } from "../../../../../redux/slices/profile/profile.type";
import { Table, TableWrapper } from "../../../../../ui_kits/Table/Table.styles";
import { formatDate } from "../../../../../utils/script";

interface IProps {
  orders: IOrderCollection[];
  handleOnclick: (id: number) => void;
}

export const OrdersTable: FC<IProps> = (props: IProps) => {
  const { orders, handleOnclick } = props;

  return (
    <TableWrapper>
      <Table className="Heading u-h5" hasNoBorder>
        <thead className="Text--subdued">
          <tr>
            <th>OrderId</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="u-h5">
          {orders.map((order: IOrderCollection) => (
            <tr key={order.orderid}>
              <td data-th="Order" onClick={() => handleOnclick(order.orderid)}>
                <span className="Link Link--underline Text--highlight">
                  {order.orderid}
                </span>
              </td>
              <td data-th="Date">{formatDate(order.date)}</td>
              <td data-th="Total">{order.price}</td>
              <td data-th="Payment">{order.paymentStatus}</td>
              <td data-th="Status">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};
