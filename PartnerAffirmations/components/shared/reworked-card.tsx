import { colors, radius, shadows } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import FadeInView from "./fade-in-animated-view";

type ReworkedCardProps = {
  children: React.ReactNode;
};

const ReworkedCard = ({ children }: ReworkedCardProps) => {
  return (
    <FadeInView style={styles.mainCardContainer}>
      <View style={styles.mainCardContent}>
        {/* <Text style={{ width: "100%", textAlign: "center" }}>
          Reworked Card
        </Text> */}
        {children}
      </View>
    </FadeInView>
  );
};
export default ReworkedCard;

const styles = StyleSheet.create({
  mainCardContainer: {
    display: "flex",
    width: "100%",
    height: "95%",

    backgroundColor: colors.card,
    borderRadius: radius.card,

    ...shadows.card,

    justifyContent: "center",
  },
  mainCardContent: {
    display: "flex",
    width: "95%",

    alignSelf: "center",
    justifyContent: "center",
  },
});
