import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { save } from '../store/slices/settingsSlice'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { iSettings } from '../types'

const SettingsPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const getSettings = useAppSelector((state: RootState) => state.settings)
  const [settings, setSettings] = useState(getSettings)

  const [visible, setVisible] = useState(false)

  const onToggleSnackBar = () => setVisible(!visible)

  const onDismissSnackBar = () => setVisible(false)

  const storeData = async (value: iSettings) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('settings', jsonValue)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSave = async (settings: iSettings) => {
    storeData(settings).then(() => {
      onToggleSnackBar()
      dispatch(save(settings))
    })
  }

  return (
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

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'Ок',
        }}
      >
        Настройки сохранены
      </Snackbar>
    </View>
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
