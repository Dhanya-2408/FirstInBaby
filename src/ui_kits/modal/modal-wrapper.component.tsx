import { ReactNode } from "react";
import { Button, Modal } from "semantic-ui-react";
import { closeModal } from "../../redux/slices/modal/modal.slice";
import { useAppDispatch } from "../../redux/store";
import { isEmpty } from "../../utils/script";
import { IF } from "../IF";

type sizeType = "mini" | "tiny" | "small" | "large" | "fullscreen";

interface IProps {
  children: ReactNode;
  handleActionClick?: () => void;
  size?: sizeType;
  header?: string;
  actionName?: string;
  basic?: boolean;
  image?: boolean;
}

export default function ModalWrapper(props: IProps) {
  const {
    children,
    handleActionClick,
    size = "mini",
    header,
    actionName,
    basic = false,
    image = false,
  } = props;

  const dispatch = useAppDispatch();

  const handleOnclose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      closeIcon
      open={true}
      onClose={handleOnclose}
      size={size}
      basic={basic}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content image={image}>{children}</Modal.Content>
      <IF condition={!isEmpty(actionName)}>
        <Modal.Actions>
          <Button onClick={handleActionClick} color="pink">
            {actionName}
          </Button>
        </Modal.Actions>
      </IF>
    </Modal>
  );
}
