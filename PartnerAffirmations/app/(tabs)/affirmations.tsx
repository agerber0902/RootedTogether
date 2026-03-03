import AffirmationHeader from "@/components/affirmations/affirmation-header";
import AffirmationText from "@/components/affirmations/affirmation-text";
import SharedCard from "@/components/shared/shared-card";
import SharedSafeView from "@/components/shared/shared-safe-view";
import SharedText from "@/components/shared/shared-text";
import { Affirmation } from "@/constants/models/affirmation";
import { getUserCreatedAffirmations } from "@/helpers/affirmation-helper";
import { useAuth } from "@/providers/auth-provider";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setUserCreatedAffirmations } from "@/state/slices/affirmation";
import { useEffect } from "react";
import { ScrollView, Text } from "react-native";

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
                            <AffirmationText key={affirmation.id} text={affirmation.message}/>
                       ))}
                    </ScrollView>
                </SharedCard>
            </>
        </SharedSafeView>
    </>;
};
export default AffirmationsScreen;