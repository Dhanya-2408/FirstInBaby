import classNames from "classnames";
import { selectedFilters } from "../../../redux/slices/collection/collection.selector";
import { setSelectedFilter } from "../../../redux/slices/collection/collection.slice";
import { ISelectedFilter } from "../../../redux/slices/collection/collection.type";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { FormCheckInput } from "../../../ui_kits/Form";
import { toggleArrayItem } from "../../../utils/generics";

export type FilterKeys = "color" | "price" | "size" | "discount";

export type FilterData = {
  id: number | string;
  title: string;
  code?: string;
};

interface IProps {
  field: FilterKeys;
  fieldCollection: FilterData[];
}

const singleFilterFields = ["price", "discount"];
const multiFilterFields = ["color", "size", "occasion"];

export const FilterItem = (props: IProps) => {
  const { field, fieldCollection } = props;

  const dispatch = useAppDispatch();
  const selectedFilterValues = useAppSelector(selectedFilters) as any;
  const selectedFilterFields = selectedFilterValues?.[field];

  const toggleFilterData = (selectedItem: FilterData) => {
    const initialData = selectedFilterValues || ({} as ISelectedFilter);
    let filters;
    if (singleFilterFields.includes(field)) {
      filters =
        selectedFilterFields === selectedItem.title ? "" : selectedItem.title;
    }
    if (multiFilterFields.includes(field)) {
      const selectedFiliterFieldsCopy = selectedFilterFields || [];
      filters = toggleArrayItem(
        selectedFiliterFieldsCopy as string[],
        selectedItem.title
      );
    }
    dispatch(setSelectedFilter({ ...initialData, [field]: filters }));
  };

  const validateIsChecked = (title: string) => {
    if (Array.isArray(selectedFilterFields)) {
      return selectedFilterFields.includes(title);
    }
    return selectedFilterFields === title;
  };

  if (field === "color" && fieldCollection) {
    return (
      <div className="CollectionFilter__Color">
        <ul className="HorizontalList">
          {fieldCollection.map((item: FilterData) => (
            <li className="HorizontalList__Item" key={item.id}>
              <div
                className={classNames("swatch__item", {
                  "swatch__item--active": validateIsChecked(item.title),
                })}
                onClick={() => toggleFilterData(item)}
                style={{
                  backgroundColor: item.code,
                }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {fieldCollection.map((item: FilterData) => (
        <li className="Linklist__Item" key={item.id}>
          <FormCheckInput
            item={item}
            name={item.title}
            label={item.title}
            handleChange={toggleFilterData}
            isChecked={validateIsChecked(item.title)}
          />
        </li>
      ))}
    </div>
  );
};
