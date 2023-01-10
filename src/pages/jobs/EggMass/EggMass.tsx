import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Provider,
  Text,
  TextInput,
} from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store/store'
import { useAppTheme } from '../../../hooks/useCustomTheme'
import CreateTable from '../../../components/tables/CreateTable'
import { add, load, remove } from '../../../store/slices/jobs/eggMassSlice'
import * as Clipboard from 'expo-clipboard'
import { eggMassAdd, eggMassDelete, eggMassLoad } from '../../../database/CRUD/EggMass'

interface iEggItem {
  barcode: string
  mass: number | null
}

const EggMass = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const [egg, setEgg] = useState<iEggItem>({ barcode: '', mass: 0 })
  const [loading, setLoading] = useState<boolean>(false)
  const items = useSelector((state: RootState) => state.eggMass)

  const handleDeleteButtonClick = (id: number): void => {
    eggMassDelete(id)
      .then(() => {
        dispatch(remove(id))
      })
      .catch((error) => console.error(error))
  }

  const handlePopupButtonClick = (): void => {
    eggMassAdd(egg.barcode, egg.mass)
      .then((item) => {
        dispatch(
          add({
            ID: item.ID,
            Barcode: item.Barcode,
            Mass: item.Mass,
            Date: item.Date,
          }),
        )
        hideModal()
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    ;(async () => {
      await setLoading(true)
      await eggMassLoad()
        .then((arr) => {
          dispatch(load(arr))
          setLoading(false)
        })
        .catch((error) => console.error(error))
    })()

    const handleClipboard = Clipboard.addClipboardListener((): void => {
      Clipboard.getStringAsync().then((content: string) => {
        setEgg({ barcode: content, mass: null })
        showModal()
      })
    })

    return () => Clipboard.removeClipboardListener(handleClipboard)
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            style={{ alignSelf: 'center' }}
            animating={true}
            color={theme.colors.primary}
          />
        </View>
      ) : (
        <CreateTable
          itemsLength={items.length}
          itemsPerPage={8}
          items={items}
          columns={[
            { name: '№', value: 'Barcode' },
            { name: 'Масса', value: 'Mass' },
          ]}
          handlers={{ delete: handleDeleteButtonClick }}
        />
      )}

      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Text style={{ textAlign: 'center' }}>№ {egg.barcode}</Text>
            <TextInput
              mode='outlined'
              keyboardType='numeric'
              label='Масса яйца в граммах'
              onChangeText={(text) => setEgg({ barcode: egg.barcode, mass: Number(text) })}
            />
            <Button style={{ marginTop: 10 }} onPress={handlePopupButtonClick}>
              Сохранить
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    height: '100%',
    justifyContent: 'space-between',
  },
  tableRows: {
    flex: 1,
  },
  container: {
    height: '100%',
  },
  modal: { backgroundColor: 'white', padding: 20 },
})

export default EggMass
