import { View } from "react-native";
import FriendView from "../friends/friend-view";
import DisplayCard from "../shared/display-card";
import AccountInfoView from "./account-info-view";
import { accountInfoCardStyle } from "@/style/stylesheets/account/account-info-card-style";

const AccountInfoCard = () => {
  return (
    <>
      <DisplayCard style={accountInfoCardStyle.displayCard} wrapperStyle={accountInfoCardStyle.webCardWrapper}>
        <View style={accountInfoCardStyle.cardContainer}>
          <View style={accountInfoCardStyle.accountInfoContainer}>
            <AccountInfoView />
          </View>
          <View style={accountInfoCardStyle.friendsContainer}>
            <FriendView />
          </View>
        </View>
      </DisplayCard>
    </>
  );
};
export default AccountInfoCard;
