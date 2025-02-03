import { FooterAboutUs } from "../../components/Footer/FooterAboutUs";
import { FooterAside } from "../../components/Footer/FooterAside";
import { FooterLinks } from "../../components/Footer/FooterLinks";
import { FooterStayConnected } from "../../components/Footer/FooterStayConnected";
import { footerLinks, IFooterLinks } from "../../mockData/footerData";
import { Container } from "../../ui_kits/global/Container.styles";
import "./Style.scss";

export const Footer = () => {
  return (
    <footer className="Footer ">
      <Container>
        <div className="Footer__Inner u-h5">
          <FooterAboutUs />
          {footerLinks.map((item: IFooterLinks) => (
            <FooterLinks links={item} key={item.title} />
          ))}
          <FooterStayConnected />
        </div>
        <FooterAside />
      </Container>
    </footer>
  );
};
