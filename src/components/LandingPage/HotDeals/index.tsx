import { hotDealsData } from "./data";
import { ImageView } from "./ImageView";
import { IF } from "../../../ui_kits/IF";
import { isEmpty } from "../../../utils/script";
import LazyLoad from "../../../ui_kits/LazyComponent";
import { ICollection } from "../../../redux/slices/home/home.type";
import { Collections } from "../__common__/Collections/Collections";

interface IProps {
  hotDealsData: ICollection[] | null;
}

export const HotDeals = (props: IProps) => {
  // const { hotDealsData } = props;



  return (
    <Collections heading="Hot Deals">
      <IF condition={!isEmpty(hotDealsData)}>
        {hotDealsData?.map((item: ICollection) => (
          <LazyLoad
            tag="div"
            key={item.name}
            className="Grid__Cell 1/1--phone 1/2--tablet-and-up 1/4--lap-and-up"
          >
            <ImageView item={item} />
          </LazyLoad>
        ))}
      </IF>
    </Collections>
  );
};
