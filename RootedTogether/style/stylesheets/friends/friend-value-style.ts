import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const friendValueStyle = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 5,
  },
  nameContainer: {
    display: "flex",
    width: "75%",

    flexDirection: "column",
    alignItems: "flex-start",
  },
  displayName: {
    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.friendDisplayName,

    ...Theme.baseText,
  },
  name: {
    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.friendName,

    ...Theme.baseText,
  },
  actionContainer: {
    display: 'flex',
    width: '25%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingRight: 15,

    gap: 15,

  },
  actionIcon: {
    color: Theme.colorScheme.primaryButton
  },
  pendingContainer: {},
  pendingText: {
    color: Theme.colorScheme.pending,
    fontFamily: Theme.typography.sans,
    fontSize: Theme.typography.size.pending,
  }
});
