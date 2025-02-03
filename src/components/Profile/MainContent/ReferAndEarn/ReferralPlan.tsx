import { QRCodeSVG } from "qrcode.react";

interface IProps {
  planInfo: Record<string, string>;
  userReferral: string;
}

export const ReferralPlan = (props: IProps) => {
  const { planInfo, userReferral } = props;

  return (
    <div className="RefferalElement u-h7 Heading">
      <QRCodeSVG value={userReferral} />,
      {Object.entries(planInfo).map(([key, value]) => (
        <div className="RefferalElement__Unit Text--subdued" key={key}>
          <span>{key.toUpperCase()}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};
