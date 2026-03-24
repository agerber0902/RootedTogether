import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "./loading-spinner";
import React, { useMemo, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { sharedSafeViewStyles } from "@/constants/stylesheets/components/shared/shared-safe-view-styles";
import { LayoutChangeEvent, View } from "react-native";

type SharedSafeViewProps = {
  isLoading?: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
};

const SharedSafeView = ({
  isLoading = false,
  header,
  children,
}: SharedSafeViewProps) => {
  const { isAuthenticated, authLoading } = useAuth();
  const [safeAreaHeight, setSafeAreaHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const contentHeight = useMemo(
    () => Math.max(safeAreaHeight - headerHeight, 0),
    [safeAreaHeight, headerHeight],
  );

  const onSafeAreaLayout = (event: LayoutChangeEvent) => {
    setSafeAreaHeight(event.nativeEvent.layout.height);
  };

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  const loading = authLoading || isLoading;
  return (
    <>
      <SafeAreaView style={sharedSafeViewStyles.safeArea} onLayout={onSafeAreaLayout}>
        {loading ? (
          <LoadingSpinner viewStyle={sharedSafeViewStyles.loadingSpinner} />
        ) : (
          <>
            {isAuthenticated && <View onLayout={onHeaderLayout}>{header}</View>}
            {isAuthenticated && (
              <View style={[sharedSafeViewStyles.contentContainer, { height: contentHeight }]}>
                {children}
              </View>
            )}
          </>
        )}

        {/* {!isAuthenticated && <LoginModal />} */}
      </SafeAreaView>
    </>
  );
};
export default SharedSafeView;
