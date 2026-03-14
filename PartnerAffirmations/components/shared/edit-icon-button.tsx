import { Theme } from "@/constants/theme";
import IconButton from "./icon-button";

type EditIconButtonProps = {
  onEdit: () => void;
};

const EditIconButton = ({ onEdit }: EditIconButtonProps) => {
  return (
    <>
      <IconButton icon="pencil" onClick={onEdit} size={20} color={Theme.colors.primary}/>
    </>
  );
};
export default EditIconButton;
