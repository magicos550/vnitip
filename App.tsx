import Header from './src/components/core/Header'

import { SafeAreaView, StyleSheet } from 'react-native'
import { MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { customTheme } from './src/config/theme'

import AuthorizationPage from './src/pages/AuthorizationPage'
import SettingsPage from './src/pages/SettingsPage'
import HomePage from './src/pages/HomePage'
import JobsPage from './src/pages/JobsPage'

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    ...customTheme.colors,
    customColor: '#ff00ff',
  },
}

export type AppTheme = typeof theme

export const useAppTheme = () => useTheme<AppTheme>()

export type StackParamsList = {
  Authorization: undefined
  Home: undefined
  Jobs: undefined
  Settings: undefined
}

const Stack = createNativeStackNavigator<StackParamsList>()

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Authorization' component={AuthorizationPage} />
            <Stack.Screen name='Home' component={HomePage} />
            <Stack.Screen name='Jobs' component={JobsPage} />
            <Stack.Screen name='Settings' component={SettingsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuButton: {
    backgroundColor: '#c4c4c4',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 0,
  },
})
