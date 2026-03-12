import { signOut } from "@/helpers/firebase-helper";
import Button from "./button";
import { useAuth } from "@/providers/auth-provider";
import { Theme } from "@/constants/theme";

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
    <>
      <Button
        title="Sign Out"
        onPress={handleSignOut}
        viewStyle={{ backgroundColor: Theme.colors.primaryButton }}
      />
    </>
  );
};
export default SignOutButton;
