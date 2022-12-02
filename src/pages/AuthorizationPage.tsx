import { View, StyleSheet } from 'react-native'
import { IconButton, MD3Colors, withTheme, Text, Button } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppTheme, StackParamsList } from '../../App'
import * as Clipboard from 'expo-clipboard'
import { useEffect } from 'react'

interface iProps {
  theme: AppTheme
  navigation: NativeStackScreenProps<StackParamsList, 'Authorization'>['navigation']
}

const AuthorizationPage = ({ theme, navigation }: iProps): JSX.Element => {
  useEffect(() => {
    const handleClipboard = Clipboard.addClipboardListener(() => {
      Clipboard.getStringAsync().then((content: string) => {
        // alert('Copy pasta! Here is the string that was copied: ' + content)
        navigation.navigate('Home')
      })

      return Clipboard.removeClipboardListener(handleClipboard)
    })
  }, [])

  return (
    <>
      <View style={styles.menu}>
        <View style={[styles.menuButton, { backgroundColor: theme.colors.secondary }]}>
          <IconButton icon='account' iconColor={MD3Colors.neutral90} size={100} />
        </View>
        <Text variant='headlineSmall'>Требуется авторизация</Text>
        <Text variant='bodyMedium' style={{ textAlign: 'center' }}>
          Для прохождения авторизации {'\n'} просканируйте штрих-код
        </Text>
        <Button onPress={() => Clipboard.setStringAsync('Some String')}>test</Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    backgroundColor: '#c4c4c4',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  menuText: {
    color: '#ffffff',
    marginTop: 0,
  },
})

export default withTheme(AuthorizationPage)