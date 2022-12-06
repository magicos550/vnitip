import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { save } from '../store/slices/settingsSlice'
import { RootState } from '../store/store'

interface iSettings {
  area: string,
  housing: string,
  line: string
}

const SettingsPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const loadedSettings = useSelector((state: RootState) => state.settings)

  const [settings , setSettings] = useState<iSettings>(loadedSettings)

  const handleSave = (settings: iSettings) => {
    dispatch(save(settings))
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Настройки</Text>
      <TextInput
        label="Площадка"
        value={settings.area}
        style={styles.marginTop}
        onChangeText={val => setSettings({...settings, area: val})}
      />
      <TextInput
        label="Корпус"
        value={settings.housing}
        style={styles.marginTop}
        onChangeText={val => setSettings({...settings, housing: val})}
      />
      <TextInput
        label="Линия"
        value={settings.line}
        style={styles.marginTop}
        onChangeText={val => setSettings({...settings, line: val})}
      />
      <Button
        mode="contained"
        style={styles.marginTop}
        onPress={() => handleSave(settings)}
      >
        Сохранить
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  marginTop: {
    marginTop: 10
  }
})

export default SettingsPage
