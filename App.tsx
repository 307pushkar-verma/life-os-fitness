import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';

import { loadState, saveState, DEFAULT_STATE } from './src/utils/storage';
import { COLORS } from './src/utils/theme';

import DashboardScreen from './src/screens/DashboardScreen';
import TodayScreen from './src/screens/TodayScreen';
import PlanScreen from './src/screens/PlanScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { setGlobalState } from './src/hooks/useAppState';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  Dashboard: '🏠', Today: '💪', Plan: '📋',
  Library: '📚', Nutrition: '🥗', Progress: '📈', Profile: '👤',
};

export default function App() {
  const [appState, setAppState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState().then(s => {
      setGlobalState(s);
      setAppState(s);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: COLORS.accent, fontSize: 24, fontWeight: '900', letterSpacing: 2, marginBottom: 20 }}>LIFE OS GYM</Text>
        <ActivityIndicator color={COLORS.accent} />
      </View>
    );
  }

  if (!appState?.profile) {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen onComplete={async (profile) => {
          const next = { ...DEFAULT_STATE, profile, selectedPlan: profile.plan };
          await saveState(next);
          setGlobalState(next);
          setAppState(next);
        }} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: COLORS.bg, borderBottomColor: COLORS.border, borderBottomWidth: 1 },
          headerTitleStyle: { color: COLORS.text, fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },
          headerTitle: route.name === 'Dashboard' ? 'LIFE OS GYM' : route.name,
          tabBarStyle: {
            backgroundColor: COLORS.bg2,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            height: 64,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.text3,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>{TAB_ICONS[route.name]}</Text>
          ),
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Nutrition" component={NutritionScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile">
          {() => <ProfileScreen onReset={async () => {
            const next = { ...DEFAULT_STATE };
            await saveState(next);
            setGlobalState(next);
            setAppState(next);
          }} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
