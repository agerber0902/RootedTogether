import ModalView from "./modal-view";
import {
  Pressable,
  Text,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";
import { useAuth } from "@/provider/auth-provider";
import { useState } from "react";
import CardButton from "@/components/shared/card-button";
import { loginModalStyle } from "@/style/stylesheets/modals/login-modal-style";
import { stringExists } from "@/helpers/validation-helper";
import { signIn, signUp } from "@/helpers/firebase-helper";
import LoadingSpinner from "@/components/shared/loading-spinner";

const LoginModal = () => {
  const { isAuthenticated, authLoading, setDisplayName } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError(undefined);
    setIsLoading(false);
  };

  const onToggleClick = () => {
    resetInputs();
    setIsCreate(!isCreate);
  };

  const onActionClick = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      if (isCreate && !stringExists(name)) {
        setError("Name is invalid.");
        return;
      } else if (!stringExists(email)) {
        setError("Username is invalid.");
        return;
      } else if (!stringExists(password) || password.length < 6) {
        setError("Password is invalid.");
        return;
      }

      const response = isCreate
        ? await signUp(email, password, name)
        : await signIn(email, password);

      // Login is handled by auth provider listener

      // Set display name
      setDisplayName(response.firebaseUser?.displayName ?? "");

      // handle error
      setError(response.error);
    } catch {
      setError("An error occured, please try again.");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <ModalView
        headerTitle={isCreate ? "Create User" : "Login"}
        isVisible={!isAuthenticated}
        onBackDrop={() => {}}
        onClose={() => {}}
        error={error}
      >
        <View style={loginModalStyle.container}>
          {/* Login Inputs */}
          <View style={loginModalStyle.inputs}>
            {isCreate && (
              <TextInput
                key={"name"}
                numberOfLines={1}
                style={loginModalStyle.editableInput}
                placeholder={`Name`}
                value={name}
                onChange={(e: TextInputChangeEvent) =>
                  setName(e.nativeEvent.text)
                }
              />
            )}
            <TextInput
              key={"email"}
              keyboardType={"email-address"}
              autoCapitalize="none"
              numberOfLines={1}
              style={loginModalStyle.editableInput}
              placeholder={`Email`}
              value={email}
              onChange={(e: TextInputChangeEvent) =>
                setEmail(e.nativeEvent.text)
              }
            />
            <TextInput
              key={"password"}
              autoCapitalize="none"
              secureTextEntry={true}
              textContentType="password"
              autoComplete="password"
              numberOfLines={1}
              style={loginModalStyle.editableInput}
              placeholder={`Password`}
              value={password}
              onChange={(e: TextInputChangeEvent) =>
                setPassword(e.nativeEvent.text)
              }
            />
          </View>

          {/* Action Buttons */}
          <View style={loginModalStyle.actions}>
            <CardButton
              key={"login-button"}
              title={isCreate ? "Create" : "Login"}
              onPress={onActionClick}
              isDisabled={authLoading || isAuthenticated || isLoading}
            />
            <Pressable
              onPress={authLoading || isLoading ? undefined : onToggleClick}
            >
              {isLoading ? (
                <LoadingSpinner viewStyle={{ padding: 5 }} />
              ) : (
                <Text
                  style={loginModalStyle.toggleButton}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {isCreate ? "Login user" : "Create new user"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ModalView>
    </>
  );
};
export default LoginModal;
