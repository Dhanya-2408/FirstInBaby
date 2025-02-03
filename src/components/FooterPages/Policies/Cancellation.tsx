import {
  PageContent,
  PageHeader,
} from "../../../ui_kits/global/PageContent.styles";
import { Container } from "../../../ui_kits/global/Container.styles";
import { SectionHeader } from "../../../ui_kits/Sections/SectionHeader/SectionHeader";
import { cancellationData } from "../../../mockData/cancellationData";

export const Cancellation = () => {
  return (
    <Container>
      <PageContent isNarrow>
        <PageHeader>
          <SectionHeader heading="Cancellation Policy" />
        </PageHeader>
        <div className="Rte">
          {cancellationData.map((item: string, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </PageContent>
    </Container>
  );
};
