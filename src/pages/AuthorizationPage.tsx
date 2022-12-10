import { View, StyleSheet } from 'react-native'
import { IconButton, MD3Colors, Text, Button, useTheme } from 'react-native-paper'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamsList } from '../Index'
import * as Clipboard from 'expo-clipboard'
import { useEffect } from 'react'
import { login } from '../store/slices/userSlice'
import { useAppDispatch } from '../store/store'

type iProps = NativeStackScreenProps<StackParamsList, 'Authorization'>

const AuthorizationPage = ({ navigation }: iProps): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClipboard = Clipboard.addClipboardListener(() => {
      Clipboard.getStringAsync().then((content: string) => {
        dispatch(login({ id: content }))
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

export default AuthorizationPage
