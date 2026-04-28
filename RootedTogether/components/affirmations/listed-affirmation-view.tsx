import {
  deleteAffirmation,
  getUserCreatedAffirmations,
} from "@/helpers/affirmation-helper";
import { Affirmation } from "@/models/affirmation";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setAnonymousUserCreatedAffirmations, setUserCreatedAffirmations } from "@/state/slices/affirmation-slice";
import {
  iconSize,
  listedAffirmationViewStyle,
} from "@/style/stylesheets/affirmations/listed-affirmation-view";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import LoadingSpinner from "../shared/loading-spinner";
import { useAuth } from "@/provider/auth-provider";
import { deleteCachedAnonymousAffirmation } from "@/config/firebase";

type ListedAffirmationViewProps = {
  affirmation: Affirmation;
  onEdit: (affirmation: Affirmation) => void;
  canEdit: boolean;
};

const ListedAffirmationView = ({
  affirmation,
  onEdit,
  canEdit,
}: ListedAffirmationViewProps) => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const { affirmationUser } = useAppSelector((state) => state.user.value);
  const { friendDisplays } = useAppSelector((state) => state.friend.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDisplayName = () => {
    if (affirmation.recipientId === affirmationUser?.uid) {
      return "You";
    }
    // Check friends
    return (
      friendDisplays.find((dc) => dc.friendId === affirmation.recipientId)
        ?.friendDisplayName ?? ""
    );
  };

  const onDelete = async () => {
    setIsLoading(true);

    try {
      if (isAuthenticated) {
        await deleteAffirmation(affirmation.id ?? "");
        dispatch(
          setUserCreatedAffirmations(
            await getUserCreatedAffirmations(affirmationUser!.uid),
          ),
        );
      } else {
        const anonAffirmations = await deleteCachedAnonymousAffirmation(affirmation);
        dispatch(setAnonymousUserCreatedAffirmations(anonAffirmations));
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      <View style={listedAffirmationViewStyle.container}>
        <View style={listedAffirmationViewStyle.messageContainer}>
          <Text
            style={listedAffirmationViewStyle.affirmationText}
            key={affirmation.id}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {affirmation?.message}
          </Text>
          <Text
            style={listedAffirmationViewStyle.recipientText}
            key={`sub-${affirmation.id}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {getDisplayName()}
          </Text>
        </View>
        {canEdit && (
          <View style={listedAffirmationViewStyle.actionContainer}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Pressable onPress={() => onEdit(affirmation)}>
                  <Ionicons
                    name="pencil"
                    size={iconSize}
                    color={listedAffirmationViewStyle.actionIcon.color}
                  />
                </Pressable>
                <Pressable onPress={onDelete}>
                  <Ionicons
                    name="trash"
                    size={iconSize}
                    color={listedAffirmationViewStyle.actionIcon.color}
                  />
                </Pressable>
              </>
            )}
          </View>
        )}
      </View>
    </>
  );
};
export default ListedAffirmationView;
