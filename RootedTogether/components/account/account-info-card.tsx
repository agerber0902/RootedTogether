import { View } from "react-native";
import FriendView from "../friends/friend-view";
import DisplayCard from "../shared/display-card";
import AccountInfoView from "./account-info-view";
import { accountInfoCardStyle } from "@/style/stylesheets/account/account-info-card-style";
import { useAuth } from "@/provider/auth-provider";
import CreateAccountButtonView from "../shared/create-account-button-view";

type AccountInfoCardProps = {
  setIsEditMode: (mode: boolean) => void;
};

const AccountInfoCard = ({ setIsEditMode }: AccountInfoCardProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <DisplayCard style={accountInfoCardStyle.displayCard}>
        <View style={accountInfoCardStyle.cardContainer}>
          {!isAuthenticated ? (
            <CreateAccountButtonView />
          ) : (
            <>
              <View style={accountInfoCardStyle.accountInfoContainer}>
                <AccountInfoView setIsEditMode={setIsEditMode} />
              </View>
              <View style={accountInfoCardStyle.friendsContainer}>
                <FriendView />
              </View>
            </>
          )}
        </View>
      </DisplayCard>
    </>
  );
};
export default AccountInfoCard;
