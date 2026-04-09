import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const partnerConnectionValueStyle = StyleSheet.create({
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
    height: "auto",

    flexDirection: "column",
    alignItems: "flex-start",
  },
  displayName: {
    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serifMedium,
    fontSize: Theme.typography.size.partnerDisplayName,

    ...Theme.baseText,
  },
  name: {
    color: Theme.colorScheme.primaryText,
    fontFamily: Theme.typography.serif,
    fontSize: Theme.typography.size.partnerName,

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
  }
});
