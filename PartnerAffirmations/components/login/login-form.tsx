import { loginModalStyles } from "@/constants/stylesheets/modals/login-modal-styles";
import { sharedModalStyles } from "@/constants/stylesheets/modals/shared-modal-styles";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Button from "../shared/button";
import { signIn, signUp } from "@/helpers/firebase-helper";
import { useAuth } from "@/providers/auth-provider";
import { Theme } from "@/constants/theme";
import SharedText from "../shared/shared-text";
import { sharedTextInputStyles } from "@/constants/stylesheets/components/shared/shared-text-input-styles";
import LoadingSpinner from "../shared/loading-spinner";

type LoginFormProps = {
  isLogin: boolean;
  toggleLoginState: () => void;
};

const LoginForm = ({ isLogin, toggleLoginState }: LoginFormProps) => {
  const { setDisplayName } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginOrCreate = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = isLogin
        ? await signIn(email, password)
        : await signUp(email, password, name);

      // Login is handles by auth provider listener

      // Set display name
      setDisplayName(response.user?.displayName ?? "");

      // handle error
      setError(response.error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={loginModalStyles.loginForm}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={sharedModalStyles.modalContainer}
      >
        {!isLogin && (
          <View style={sharedTextInputStyles.textInputWrapper}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              selectionColor={Theme.colors.primary}
            />
          </View>
        )}

        <View style={sharedTextInputStyles.textInputWrapper}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={sharedTextInputStyles.textInputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            autoComplete="password"
          />
        </View>

        {error && (
          <SharedText
            numberOfLines={1}
            style={loginModalStyles.error}
            text={error}
          ></SharedText>
        )}

        <View style={loginModalStyles.actions}>
          {isLoading ? (
            <LoadingSpinner viewStyle={{ padding: 5 }} />
          ) : (
            <Button
              title={isLogin ? "Login" : "Create"}
              onPress={loginOrCreate}
            />
          )}

          <Pressable onPress={toggleLoginState}>
            <SharedText
              style={loginModalStyles.toggleAction}
              text={isLogin ? "Create Account" : "Back to Login"}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LoginForm;
