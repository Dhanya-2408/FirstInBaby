import { FC } from "react";
import { IOrderItem } from "../../../../../../redux/slices/profile/profile.type";
import "./OrderCards.scss";

interface IProps {
  orderItems: IOrderItem[];
}

export const OrderCards: FC<IProps> = (props: IProps) => {
  const { orderItems } = props;

  return (
    <div className="Order__Cards">
      {orderItems.map((item: IOrderItem) => (
        <div className="Order__Card" key={item.id}>
          <div className="Card__Img">
            <img src={item.imgUrl} alt={item.name} />
          </div>
          <div className="Card__Desc u-h5 Heading">
            <div className="Sub__Title">{item.name}</div>
            <div className="Sub__Title">{`${item.color} / ${item.size}`}</div>
            <div className="Sub__Title">{`${item.quantity} x ₹ ${item.subt}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
