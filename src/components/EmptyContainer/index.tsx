import "./Style.scss";

interface IProps {
  url: string;
  head: string;
  subhead: string;
}

export const EmptyContainer = (props: IProps) => {
  return (
    <div className="EmptyContainer">
      <img
        src={props.url}
        alt="orders-not-found"
        className="EmptyContainer__Image"
      />
      <h2 className="EmptyContainer__Header Heading Text--highlight">
        {props.head}
      </h2>
      <div className="EmptyContainer__Subhead">{props.subhead}</div>
    </div>
  );
};
