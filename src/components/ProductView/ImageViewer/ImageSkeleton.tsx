import { FC } from "react";

interface IProps {
  slide: string;
}

export const ImageSkeleton: FC<IProps> = (props: IProps) => {
  const { slide } = props;

  return (
    <div className="ProductImage__Grid--Container">
      <div
        className="ProductImage__Grid--Image"
        style={{ backgroundImage: `url(${slide})` }}
      ></div>
      <div className="ProductImage__Grid--SkeletonLoader"></div>
    </div>
  );
};
