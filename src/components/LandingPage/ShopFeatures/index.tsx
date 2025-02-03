import { ImageWrapper } from "../../../ui_kits/ImageWrapper/ImageWrapper";
import LazyLoad from "../../../ui_kits/LazyComponent";
import { Collections } from "../__common__/Collections/Collections";
import { ShopFeature, ShopFeaturesData } from "./data";

export const ShopFeatures = () => {
  return (
    <Collections isNarrow>
      {ShopFeaturesData.map((item: ShopFeature) => (
        <LazyLoad
          tag="div"
          key={item.id}
          className="Grid__Cell  1/3--tablet-and-up"
        >
          <div className="ShopFeature Text--alignCenter Heading">
            <div className="CollectionItem__ImageWrapper">
              <ImageWrapper
                src={item.img}
                alt={item.id}
                classes="CollectionItem__Image Image--zoomOut"
              />
            </div>
            <h4 className="Heading Text--highlight">{item.title}</h4>
            <p className="u-h5">{item.textContent}</p>
          </div>
        </LazyLoad>
      ))}
    </Collections>
  );
};
