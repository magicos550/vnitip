import { store } from './src/store/store'
import { Provider as ReduxProvider } from 'react-redux'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import Index from './src/Index'
import { customTheme } from './src/config/theme'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    ...customTheme.colors,
  },
}

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <ExpoStatusBar style='light' />
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <Index />
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
})
