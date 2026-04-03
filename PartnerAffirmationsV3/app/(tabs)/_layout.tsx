import { Tabs } from "expo-router";
import React from "react";
import { tabStyle } from "@/style/stylesheets/tab-style";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: tabStyle.screenOptions.borderRadius,
          borderTopRightRadius: tabStyle.screenOptions.borderRadius,
        },
        tabBarActiveTintColor: tabStyle.screenOptions.tabActiveColor,
        tabBarInactiveTintColor: tabStyle.screenOptions.tabInactiveColor,
      }}
    >
      <Tabs.Screen
        name="affirmations"
        options={{
          title: "Affirmations",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "albums" : 'albums-outline'}
              size={size + (focused ? tabStyle.screenOptions.selectedIconSize : 0)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size + (focused ? tabStyle.screenOptions.selectedIconSize : 0)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size + (focused ? tabStyle.screenOptions.selectedIconSize : 0)}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
