import { store } from './src/store/store'
import { Provider as ReduxProvider } from 'react-redux'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import Index from './src/Index'
import { customTheme } from './src/config/theme'

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
    <ReduxProvider store={store}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <PaperProvider theme={theme}>
          <Index />
        </PaperProvider>
      </SafeAreaView>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  }
})
