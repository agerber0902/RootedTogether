import { Theme } from "@/constants/theme";
import IconButton from "./icon-button";

type DeleteIconButtonProps = {
    onClick: () => void;
};

const DeleteIconButton = ({onClick}: DeleteIconButtonProps) => {
    return <>
        <IconButton icon="trash" size={20} onClick={onClick} color={Theme.colors.primary}/>
    </>;
};
export default DeleteIconButton;