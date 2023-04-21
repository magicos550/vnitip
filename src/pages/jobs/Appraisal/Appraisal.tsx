import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { RootState, useAppDispatch, useAppSelector } from '../../../store/store'
import { useAppTheme } from '../../../hooks/useCustomTheme'
import CreateTable from '../../../components/tables/CreateTable'
import { add, edit, load, remove, removeAll } from '../../../store/slices/jobs/appraisalSlice'
import * as Clipboard from 'expo-clipboard'
import {
  appraisalAdd,
  appraisalDelete,
  appraisalDeleteAll,
  appraisalEdit,
  appraisalLoad,
} from '../../../database/CRUD/Appraisal'
import moment from 'moment'
import Fab from '../../../components/fab/Fab'
import { iAppraisalItem } from '../../../types'

const Appraisal = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => {
    setVisible(false)
  }

  const [egg, setEgg] = useState<iAppraisalItem>({
    id: null,
    user: '',
    barcode: '',
    mass: 0,
    chest: 0,
    legs: 0,
    remark: '',
    date: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const items = useAppSelector((state: RootState) => state.appraisal)
  const user = useAppSelector((state: RootState) => state.user)

  const handleDeleteButtonClick = (id: number): void => {
    appraisalDelete(id)
      .then(() => {
        dispatch(remove(id))
      })
      .catch((error) => console.error(error))
  }

  const handleEditButtonClick = (item: Record<string, any>): void => {
    setEgg({
      id: item.ID,
      user: user.id || '',
      barcode: item.Barcode,
      mass: item.Mass,
      chest: item.Chest,
      legs: item.Legs,
      remark: item.Remark,
      date: item.Date,
    })

    showModal()
  }

  const handlePopupButtonClick = (): void => {
    if (!egg.id) {
      appraisalAdd(user.id || '', egg.barcode, egg.mass, egg.chest, egg.legs, egg.remark)
        .then((item) => {
          dispatch(
            add({
              ID: item.ID,
              User: user.id || '',
              Barcode: item.Barcode,
              Mass: item.Mass,
              Chest: item.Chest,
              Legs: item.Legs,
              Remark: item.Remark,
              Date: item.Date,
            }),
          )
          hideModal()
        })
        .catch((error) => console.error(error))
    } else {
      appraisalEdit(egg.id, user.id || '', egg.barcode, egg.mass, egg.chest, egg.legs, egg.remark)
        .then((item) => {
          dispatch(
            edit({
              ID: item.ID,
              User: user.id || '',
              Barcode: item.Barcode,
              Mass: item.Mass,
              Chest: item.Chest,
              Legs: item.Legs,
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
      await appraisalLoad()
        .then((arr) => {
          dispatch(load(arr))
          setLoading(false)
        })
        .catch((error) => console.error(error))
    })()

    const handleClipboard = Clipboard.addClipboardListener((): void => {
      Clipboard.getStringAsync().then((content: string) => {
        setEgg({
          barcode: content.replace(/(\r\n|\n|\r)/gm, ''),
          user: user.id || '',
          mass: 0,
          chest: 0,
          legs: 0,
          remark: '',
          date: moment().format('DD.MM.YYYY H:m:s'),
        })
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
            /* { name: 'Масса', value: 'Mass', suffix: 'г.' },
            { name: 'Грудь', value: 'Chest', suffix: 'г.' },
            { name: 'Ноги', value: 'Legs', suffix: 'г.' },
            { name: 'Примечание', value: 'Remark' }, */
          ]}
          handlers={{ delete: handleDeleteButtonClick, edit: handleEditButtonClick }}
        />
      )}

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text style={{ textAlign: 'center' }}>№ {egg.barcode}</Text>
          <TextInput
            mode='outlined'
            keyboardType='numeric'
            label='Живая масса'
            value={(egg.mass && String(egg.mass)) || ''}
            onChangeText={(text) => setEgg({ ...egg, mass: Number(text) })}
          />
          <TextInput
            mode='outlined'
            keyboardType='numeric'
            label='Грудь'
            value={(egg.chest && String(egg.chest)) || ''}
            onChangeText={(text) => setEgg({ ...egg, chest: Number(text) })}
          />
          <TextInput
            mode='outlined'
            keyboardType='numeric'
            label='Ноги'
            value={(egg.legs && String(egg.legs)) || ''}
            onChangeText={(text) => setEgg({ ...egg, legs: Number(text) })}
          />
          <TextInput
            mode='outlined'
            label='Примечание'
            value={(egg.remark && String(egg.remark)) || ''}
            onChangeText={(text) => setEgg({ ...egg, remark: text })}
          />
          <Button style={{ marginTop: 10 }} onPress={handlePopupButtonClick}>
            Сохранить
          </Button>
        </Modal>
      </Portal>

      <Fab
        data={Object.keys(items).map((item) => {
          return {
            Пользователь: items[item].User,
            Код: items[item].Barcode,
            Масса: items[item].Mass,
            Грудь: items[item].Chest,
            Ноги: items[item].Legs,
            Примечание: items[item].Remark,
            Дата: items[item].Date,
          }
        })}
        jobId='4'
        deleteAllCallback={() => {
          appraisalDeleteAll().then(() => {
            dispatch(removeAll())
          })
        }}
      />
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    elevation: 10,
  },
})

export default Appraisal
