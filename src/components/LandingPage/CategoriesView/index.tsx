import { ImageView } from "./ImageView";
import { IF } from "../../../ui_kits/IF";
import { collectionsData } from "./data";
import { isEmpty } from "../../../utils/script";
import LazyLoad from "../../../ui_kits/LazyComponent";
import { ICollection } from "../../../redux/slices/home/home.type";
import { Collections } from "../__common__/Collections/Collections";

interface IProps {
  collectionsData: ICollection[] | null;
}

export const CategoriesView = (props: IProps) => {
  // const { collectionsData } = props;

  return (
    <Collections
      heading="COLLECTIONS"
      subHeading="Big Bang Deals On Our Favourite Collections!"
    >
      <IF condition={!isEmpty(collectionsData)}>
        {collectionsData?.map((item: ICollection, index: number) => (
          <LazyLoad
            tag="div"
            key={index}
            className="Grid__Cell 1/1--phone 1/2--tablet-and-up 1/3--lap-and-up"
          >
            <ImageView collectionItem={item} />
          </LazyLoad>
        ))}
      </IF>
    </Collections>
  );
};
