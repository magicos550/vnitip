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
import { add, edit, load, remove } from '../../../store/slices/jobs/liveWeightSlice'
import * as Clipboard from 'expo-clipboard'
import {
  liveWeightAdd,
  liveWeightDelete,
  liveWeightEdit,
  liveWeightLoad,
} from '../../../database/CRUD/LiveWeight'
import moment from 'moment'
import Fab from '../../../components/fab/Fab'

interface iEggItem {
  id?: number | null
  barcode: string
  mass: number
  date: string
}

const LiveWeight = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => {
    setVisible(false)
  }

  const [egg, setEgg] = useState<iEggItem>({ id: null, barcode: '', mass: 0, date: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const items = useSelector((state: RootState) => state.liveWeight)

  const handleDeleteButtonClick = (id: number): void => {
    liveWeightDelete(id)
      .then(() => {
        dispatch(remove(id))
      })
      .catch((error) => console.error(error))
  }

  const handleEditButtonClick = (item: Record<string, any>): void => {
    setEgg({ id: item.ID, barcode: item.Barcode, mass: item.Mass, date: item.date })
    showModal()
  }

  const handlePopupButtonClick = (): void => {
    if (!egg.id) {
      liveWeightAdd(egg.barcode, egg.mass)
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
    } else {
      liveWeightEdit(egg.id, egg.mass, egg.date, egg.barcode)
        .then((item) => {
          dispatch(
            edit({
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
  }

  useEffect(() => {
    ;(async () => {
      await setLoading(true)
      await liveWeightLoad()
        .then((arr) => {
          dispatch(load(arr))
          setLoading(false)
        })
        .catch((error) => console.error(error))
    })()

    const handleClipboard = Clipboard.addClipboardListener((): void => {
      Clipboard.getStringAsync().then((content: string) => {
        setEgg({ barcode: content, mass: 0, date: moment().format('DD.MM.YYYY H:m:s') })
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
          items={items && Object.keys(items).map((key) => items[key])}
          columns={[
            { name: '№', value: 'Barcode' },
            { name: 'Масса', value: 'Mass', suffix: 'г.' },
          ]}
          handlers={{ delete: handleDeleteButtonClick, edit: handleEditButtonClick }}
        />
      )}

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text style={{ textAlign: 'center' }}>
            № {egg.barcode} {egg.id}
          </Text>
          <TextInput
            mode='outlined'
            keyboardType='numeric'
            label='Живая масса'
            value={(egg.mass && String(egg.mass)) || ''}
            onChangeText={(text) =>
              setEgg({ id: egg.id, barcode: egg.barcode, mass: Number(text), date: egg.date })
            }
          />
          <Button style={{ marginTop: 10 }} onPress={handlePopupButtonClick}>
            Сохранить
          </Button>
        </Modal>
      </Portal>

      <Fab />
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
  modal: { backgroundColor: 'white', padding: 20, width: '90%', alignSelf: 'center' },
})

export default LiveWeight
