import { useNavigate } from "react-router-dom";
import { FlashSaleIcon } from "../../assets/icons/FlashSale.icon";
import { TextButton } from "../../ui_kits/Buttons/TextButton/TextButton.component";

export const PreOrder = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/preorder");
  };

  return (
    <TextButton
      className="Presale_Btn hidden-pocket hidden-lap"
      onClick={handleOnclick}
      isSmall
    >
      <>
        <FlashSaleIcon />
        PRE SALE
      </>
    </TextButton>
  );
};
