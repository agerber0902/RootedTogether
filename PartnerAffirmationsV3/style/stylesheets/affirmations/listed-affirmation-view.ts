import { Theme } from "@/style/theme";
import { StyleSheet } from "react-native";

export const iconSize: number = 20;

export const listedAffirmationViewStyle = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 'auto',

    flexDirection: 'row',
    alignItems: 'center'
  },
  messageContainer: {
    width: "75%",
    height: "auto",

    paddingBottom: 15,
  },
  actionContainer: {
    display: 'flex',
    width: '25%',
    height: 'auto',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  affirmationText: {
    ...Theme.baseText,
    fontFamily: Theme.typography.serif,
    fontSize: 20,
    color: Theme.colorScheme.primaryText,
    letterSpacing: 0.5,
  },
  recipientText: {
    ...Theme.baseText,
    fontFamily: Theme.typography.serif,
    fontSize: 16,
    color: Theme.colorScheme.secondaryText,
    letterSpacing: 0.5,
  },
  actionIcon: {
    color: Theme.colorScheme.primaryButton
  }
});
