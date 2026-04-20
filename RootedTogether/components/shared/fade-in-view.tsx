import { fadeInViewStyle } from "@/style/stylesheets/components/shared/fade-in-view";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type FadeInViewProps = {
  visible: boolean;
  duration?: number | undefined;
  delay?: number | undefined;
  children: React.ReactNode;
  finalElevation?: number;
  useElevation?: boolean;
};

const FadeInView = ({
  visible,
  duration = 1000,
  delay = 0,
  children,
  finalElevation = 6,
  useElevation = false,
}: FadeInViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const elevation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      if (useElevation) {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(elevation, {
            toValue: finalElevation,
            duration,
            delay,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [visible, opacity, duration, delay, elevation, useElevation, finalElevation]);

  return (
    <>
      <Animated.View
        style={[
          fadeInViewStyle.container,
          {
            opacity,
            elevation,
          },
        ]}
      >
        {children}
      </Animated.View>
    </>
  );
};
export default FadeInView;
