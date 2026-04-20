import { StyleSheet } from "react-native";

export const accountInfoCardStyle = StyleSheet.create({
  displayCard: {
    // height: "95%",
    display: 'flex',
    flex: 1,
  },
  cardContainer: {
    display: "flex",
    width: "100%",
    // height: "100%",
    flex: 1,

    flexDirection: "column",

    gap: 5,
  },
  accountInfoContainer: {
    width: "100%",
    // height: "50%",
    flex: 5.5,
  },
  friendsContainer: {
    width: "100%",
    // height: "48%",
    flex: 4.5,
  },
});
