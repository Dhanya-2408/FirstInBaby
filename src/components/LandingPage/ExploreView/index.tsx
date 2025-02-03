import { ImageView } from "./ImageView";
import { IF } from "../../../ui_kits/IF";
import { shopByProductsData } from "./data";
import { isEmpty } from "../../../utils/script";
import LazyLoad from "../../../ui_kits/LazyComponent";
import { collectionsData } from "../CategoriesView/data";
import { ICollection } from "../../../redux/slices/home/home.type";
import { Collections } from "../__common__/Collections/Collections";

interface IProps {
  shopByProductsData: ICollection[] | null;
}

export const ExploreView = (props: IProps) => {
  // const { shopByProductsData } = props;




  const dataSet1 = shopByProductsData?.slice(0, 1);
  const dataSet2 = shopByProductsData?.slice(1, 5);

  const dataset = {
    dataSet1,
    dataSet2,
  };

  return (
    <Collections
      heading="Explore"
      subHeading="Ready to take your style to the next level?"
      isNarrow
    >
      <IF condition={!isEmpty(shopByProductsData)}>
        {Object.entries(dataset).map(([key, value]) => {
          return (
            <LazyLoad
              tag="div"
              className="Grid__Cell 1/2--tablet-and-up"
              style={{ padding: 0 }}
              key={key}
            >
              {value?.map((item: ICollection, index: number) => (
                <div
                  key={index}
                  className={`Grid__Cell ${
                    key === "dataSet1" ? "" : "1/2--phone 1/2--tablet-and-up"
                  }`}
                >
                  <ImageView collectionItem={item} />
                </div>
              ))}
            </LazyLoad>
          );
        })}
      </IF>
    </Collections>
  );
};
