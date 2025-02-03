import "./RadioSwatch.scss";

interface IProps<T, K extends keyof T> {
  name: string;
  productSizeArray: Array<T>;
  valueKey: K;
  onChange: (selectedInput: T[K]) => void;
  initialSelectedItem: T[K];
}

export const RadioSwatch = <T, K extends keyof T>(props: IProps<T, K>) => {
  const { name, onChange, productSizeArray, valueKey, initialSelectedItem } =
    props;

  const radioHandler = (item: T) => {
    onChange(item[valueKey] as T[K]);
  };

  return (
    <ul className="HorizontalList HorizontalList--spacingTight">
      {productSizeArray.map((sizeItem, index) => (
        <li className="HorizontalList__Item" key={index}>
          <input
            type="radio"
            id={`${sizeItem[valueKey]}-${index}`}
            value={sizeItem[valueKey] as any}
            name={`${name}-option`}
            onChange={() => radioHandler(sizeItem)}
            checked={initialSelectedItem === sizeItem[valueKey]}
            className="RadioSwatch__Input"
          />
          <label
            className="RadioSwatch__Label Heading u-h6"
            htmlFor={`${sizeItem[valueKey]}-${index}`}
          >
            {sizeItem[valueKey] as any}
          </label>
        </li>
      ))}
    </ul>
  );
};
