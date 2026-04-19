import { Platform, StyleSheet } from "react-native";

export const accountInfoCardStyle = StyleSheet.create({
  displayCard: {
    height: "95%",
  },
  webCardWrapper: {
    ...(Platform.OS === "web" ? { minHeight: "130%" } : {}),
  },
  cardContainer: {
    display: "flex",
    width: "100%",
    height: "100%",

    flexDirection: "column",

    gap: 5,
  },
  accountInfoContainer: {
    width: "100%",
    height: "50%",
  },
  friendsContainer: {
    width: "100%",
    height: "48%",
  },
});
