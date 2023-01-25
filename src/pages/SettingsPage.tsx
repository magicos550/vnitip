import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper'
import { save } from '../store/slices/settingsSlice'
import { useAppDispatch } from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppTheme } from '../hooks/useCustomTheme'

interface iSettings {
  area: string
  housing: string
  line: string
}

const SettingsPage = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const getData = async (): Promise<iSettings | undefined> => {
    try {
      const jsonValue = await AsyncStorage.getItem('settings')
      return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error(e)
    }
  }

  const storeData = async (value: iSettings) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('settings', jsonValue)
    } catch (e) {
      console.error(e)
    }
  }

  const [settings, setSettings] = useState<iSettings>({
    area: '0',
    housing: '0',
    line: '0',
  })

  const handleSave = async (settings: iSettings) => {
    storeData(settings).then(() => dispatch(save(settings)))
  }

  useEffect(() => {
    getData().then((res): void => {
      res && setSettings(res)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            style={{ alignSelf: 'center' }}
            animating={true}
            color={theme.colors.primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text variant='titleLarge'>Настройки</Text>
          <TextInput
            label='Площадка'
            value={settings.area}
            style={styles.marginTop}
            onChangeText={(val) => setSettings({ ...settings, area: val })}
          />
          <TextInput
            label='Корпус'
            value={settings.housing}
            style={styles.marginTop}
            onChangeText={(val) => setSettings({ ...settings, housing: val })}
          />
          <TextInput
            label='Линия'
            value={settings.line}
            style={styles.marginTop}
            onChangeText={(val) => setSettings({ ...settings, line: val })}
          />
          <Button mode='contained' style={styles.marginTop} onPress={() => handleSave(settings)}>
            Сохранить
          </Button>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: 10,
  },
})

export default SettingsPage
