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

const LoginModal = () => {
  const { isAuthenticated, authLoading } = useAuth();

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

  const onCreateClick = () => {
    setIsLoading(true);

    try {
      if (isCreate && !stringExists(name)) {
        setError("Name is invalid.");
      } else if (!stringExists(email)) {
        setError("Username is invalid.");
      } else if (!stringExists(password) || password.length < 6) {
        setError("Password is invalid.");
      }
    } catch {
      setIsLoading(false);
      setError("An error occured, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalView
        headerTitle={isCreate ? "Create User" : "Login"}
        isVisible={!isAuthenticated}
        onBackDrop={() => {}}
        onClose={() => {}}
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
              onPress={onCreateClick}
              isDisabled={authLoading || isAuthenticated || isLoading}
            />
            <Pressable onPress={(authLoading || isLoading) ? undefined : onToggleClick}>
              <Text
                style={loginModalStyle.toggleButton}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {isCreate ? "Login user" : "Create new user"}
              </Text>
            </Pressable>
            {/* Error Message */}
            {error && (
              <Text
                style={loginModalStyle.error}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {error}
              </Text>
            )}
          </View>
        </View>
      </ModalView>
    </>
  );
};
export default LoginModal;
