// App.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORS } from './src/utils/theme';
import { useStorage } from './src/hooks/useStorage';

import DashboardScreen from './src/screens/DashboardScreen';
import TodayScreen from './src/screens/TodayScreen';
import PlanScreen from './src/screens/PlanScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const color = focused ? COLORS.accent : COLORS.text3;
  const icons = {
    Dash: focused ? '⬛' : '⬜',
  };
  return null; // Replace with react-native-vector-icons or expo/vector-icons
};

export default function App() {
  const { state, loaded, updateState, resetData } = useStorage();
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    if (loaded) {
      setOnboarded(!!state.profile);
    }
  }, [loaded, state.profile]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  if (!onboarded) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        <OnboardingScreen
          onComplete={(profile) => {
            updateState({
              profile,
              weightLog: [{ date: new Date().toISOString().split('T')[0], weight: profile.weight }],
              selectedPlan: profile.plan,
            });
            setOnboarded(true);
          }}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: COLORS.accent,
            background: COLORS.bg,
            card: COLORS.card,
            text: COLORS.text,
            border: COLORS.border,
            notification: COLORS.accent,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(10,10,15,0.95)',
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              paddingBottom: 8,
              paddingTop: 8,
              height: 65,
            },
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.text3,
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            },
          }}
        >
          <Tab.Screen
            name="Dash"
            children={() => <DashboardScreen state={state} updateState={updateState} />}
          />
          <Tab.Screen
            name="Today"
            children={() => <TodayScreen state={state} updateState={updateState} />}
          />
          <Tab.Screen
            name="Plan"
            children={() => <PlanScreen state={state} />}
          />
          <Tab.Screen
            name="Library"
            children={() => <LibraryScreen />}
          />
          <Tab.Screen
            name="Food"
            children={() => <NutritionScreen state={state} />}
          />
          <Tab.Screen
            name="Progress"
            children={() => <ProgressScreen state={state} updateState={updateState} />}
          />
          <Tab.Screen
            name="Profile"
            children={() => <ProfileScreen state={state} updateState={updateState} resetData={resetData} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
