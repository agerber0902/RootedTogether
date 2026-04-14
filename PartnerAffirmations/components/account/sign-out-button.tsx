import { signOut } from "@/helpers/firebase-helper";
import CardButton from "../shared/card-button";
import { useAuth } from "@/provider/auth-provider";

const SignOutButton = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    if (!user) {
      return undefined;
    }

    const isSignedOut = await signOut();
    return isSignedOut;
  };

  return (
    <CardButton title="Sign Out" isDisabled={false} onPress={handleSignOut} />
  );
};
export default SignOutButton;
