import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const deleteModalStyle = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: 'auto',
  },
  messageView: {
    display: 'flex',
    width: '100%',

    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',

    padding: 10,
  },
  message: {
    width: '90%',


    ...Theme.baseText,
    fontFamily: Theme.typography.sans,
    fontSize: Theme.typography.size.subHeader,
    color: Theme.colorScheme.primaryText,

    letterSpacing: 0.5,
  },
  actions: {
    display: "flex",
    width: "100%",

    flexDirection: "row",
    alignSelf: "center",
    justifyContent: 'center',
    
    gap: 5,

    marginTop: "auto",
    paddingBottom: Theme.spacing.sm,
  },
  actionWrapper: {
    width: '40%',
  },
});
