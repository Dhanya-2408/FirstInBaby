import "./Style.scss";

interface IProps {
  productSpecification: string;
}

export const Specification = (props: IProps) => {
  const { productSpecification } = props;

  return (
    <div className="Spec-TableContainer">
      {productSpecification.split(",")?.map((spec: string) => {
        const [key, value] = spec.split(":");
        return (
          <div className="Spec-Row Heading u-h6" key={key}>
            <div className="Spec-RowKey">{key}</div>
            <div className="Spec-RowValue">{value}</div>
          </div>
        );
      })}
    </div>
  );
};
