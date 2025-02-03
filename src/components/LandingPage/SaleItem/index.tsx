import { IF } from "../../../ui_kits/IF";
import { isEmpty } from "../../../utils/script";
import { productsData } from "../../../mockData/productsData";
import { collectionsData } from "../../../mockData/collectionData";
import { Collections } from "../__common__/Collections/Collections";
import { FeatureProduct } from "../__common__/FeatureProduct/FeatureProduct";
import { IProductData } from "../../../redux/slices/collection/collection.type";

interface IProps {
  saleData: IProductData[] | undefined;
}

export const SaleItem = (props: IProps) => {
  let { saleData = [] } = props;

  saleData = productsData.productdto;

  return (
    <Collections heading="Sale item of the Week!!">
      <IF condition={!isEmpty(saleData)}>
        {saleData.map((pdt: IProductData) => (
          <div className="Grid__Cell  1/3--tablet-and-up" key={pdt.id}>
            <FeatureProduct
              url={pdt.imageUrl}
              title={pdt.productName}
              price={pdt.price}
              mcId={pdt.id}
              isVisibleSaleLabel={true}
            />
          </div>
        ))}
      </IF>
    </Collections>
  );
};
