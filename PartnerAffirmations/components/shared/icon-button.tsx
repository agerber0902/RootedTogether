import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
type IconButtonProps = {
    onClick: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    size?: number,
    color: string
};

const IconButton = ({onClick, icon, size = 20, color}: IconButtonProps) => {
  return (
    <>
      <Pressable onPress={onClick}>
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
    </>
  );
};
export default IconButton;
