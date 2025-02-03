import "./Style.scss";
import { IF } from "../../../ui_kits/IF";
import { isEmpty } from "../../../utils/script";
import { InstaFeedItem } from "./InstaFeedItem";
import { productsData } from "../../../mockData/productsData";
import { collectionsData } from "../../../mockData/collectionData";
import { IProductData } from "../../../redux/slices/collection/collection.type";
import { SectionHeader } from "../../../ui_kits/Sections/SectionHeader/SectionHeader";
import { SectionWrapper } from "../../../ui_kits/Sections/SectionWrapper/SectionWrapper";

interface IProps {
  instaData: IProductData[] | undefined;
}

export const InstaFeed = (props: IProps) => {
  let { instaData = [] } = props;

  // const SlicedInstaData = instaData.slice(0, 8) || [];

  instaData = productsData.productdto;

  return (
    <section className="Instafeed">
      <SectionWrapper isbordered>
        <SectionHeader
          heading="@FIRSTINCRY"
          subHeading="FOLLOW US & SHOP INSTAGRAM"
        />
        <div className="Instafeed__Container Grid">
          <IF condition={!isEmpty(instaData)}>
            {instaData.map((item: IProductData) => (
              <InstaFeedItem key={item.id} instaFeedItem={item} />
            ))}
          </IF>
        </div>
      </SectionWrapper>
    </section>
  );
};
