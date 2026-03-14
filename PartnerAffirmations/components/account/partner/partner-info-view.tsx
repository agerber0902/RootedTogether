import Header from "@/components/shared/header";
import { View } from "react-native";
import PartnerInfoText from "./partner-name-text";

const PartnerInfoView = () => {
  return (
    <>
      <View>
        <Header headerText="Partners" subHeaderText=""  headerStyle={{marginTop: 0}}/>
        <View>
            <PartnerInfoText/>
        </View>
      </View>
    </>
  );
};
export default PartnerInfoView;
