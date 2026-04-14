import { Tabs } from "expo-router";
import React from "react";
import { tabStyle } from "@/style/stylesheets/tab-style";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
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
          title: "Create",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "create" : 'create-outline'}
              size={size + (focused ? tabStyle.screenOptions.selectedIconSize : 0)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "leaf" : "leaf-outline"}
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
