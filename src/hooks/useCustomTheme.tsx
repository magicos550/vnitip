import { MD3LightTheme, useTheme } from 'react-native-paper'
import { customTheme } from '../config/theme'

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

export const useCustomTheme = () => useTheme<AppTheme>()
