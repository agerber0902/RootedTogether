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
  }

  const onToggleClick = () => {
    resetInputs();
    setIsCreate(!isCreate);
  }

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
              onPress={() => {}}
              isDisabled={authLoading || isAuthenticated}
            />
            <Pressable onPress={onToggleClick}>
              <Text
                style={loginModalStyle.toggleButton}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {isCreate ? "Login user" : "Create new user"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalView>
    </>
  );
};
export default LoginModal;
