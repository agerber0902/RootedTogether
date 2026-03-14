import { StyleSheet } from "react-native";

export const partnerInfoCardStyles = StyleSheet.create({
  infoCardContainer: {
    flex: 1,
  },
  infoCardContent: {
    flex: 1,
    
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  actions: {
    display: 'flex',
    width: '100%',
  },
  addButton: {
    width: '50%',

    alignSelf: 'center',
  },
});
