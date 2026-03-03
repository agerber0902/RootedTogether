import AffirmationHeader from "@/components/affirmations/affirmation-header";
import AffirmationText from "@/components/affirmations/affirmation-text";
import Button from "@/components/shared/button";
import SharedCard from "@/components/shared/shared-card";
import SharedSafeView from "@/components/shared/shared-safe-view";
import { Affirmation } from "@/constants/models/affirmation";
import { affirmationCardStyles } from "@/constants/stylesheets/components/affimations/affirmation-card-styles";
import { getUserCreatedAffirmations } from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";
import { useEffect } from "react";
import { ScrollView } from "react-native";

const AffirmationsScreen = () => {
    const { user } = useAuth();
    
    const dispatch = useAppDispatch();
    const { userCreatedAffirmations } = useAppSelector((state) => state.affirmation.value);

    useEffect(() => {
        const getDisplayAffirmations = async() => {
            const createdAffirmations = await getUserCreatedAffirmations(user?.uid ?? '0');

            dispatch(setUserCreatedAffirmations(createdAffirmations));
        }

        getDisplayAffirmations();
    }, [dispatch, user]);

    return <>
        <SharedSafeView header={<AffirmationHeader/>}>
            <>
                <SharedCard visible={true}>
                    <ScrollView scrollEnabled={true}>
                       {userCreatedAffirmations.map((affirmation: Affirmation) => (
                            <AffirmationText key={affirmation.id} style={affirmationCardStyles.affirmation} text={affirmation.message}/>
                       ))}
                    </ScrollView>
                    <Button onPress={() => {}} title="Create Affirmation"/>
                </SharedCard>
            </>
        </SharedSafeView>
    </>;
};
export default AffirmationsScreen;