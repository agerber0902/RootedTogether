import { fadeInViewStyle } from "@/style/stylesheets/components/shared/fade-in-view";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type FadeInViewProps = {
    visible: boolean;
    duration?: number | undefined;
    delay: number | 0;
    children: React.ReactNode;
};

const FadeInView = ({ visible, duration = 1000, delay, children } : FadeInViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity, duration, delay]);

  return (
    <>
      <Animated.View style={{ opacity, ...fadeInViewStyle.container }}>{children}</Animated.View>
    </>
  );
};
export default FadeInView;
