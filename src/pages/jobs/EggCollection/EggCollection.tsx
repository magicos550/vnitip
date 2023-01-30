import { ActivityIndicator } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { useAppTheme } from '../../../hooks/useCustomTheme'
import * as Clipboard from 'expo-clipboard'
import { RootState, useAppDispatch } from '../../../store/store'
import { add, load, remove, removeAll } from '../../../store/slices/jobs/eggCollectionSlice'
import { useSelector } from 'react-redux'
import {
  eggCollectionAdd,
  eggCollectionLoad,
  eggColllectionDelete,
  eggCollectionDeleteAll,
} from '../../../database/CRUD/EggCollection'
import { StyleSheet, View } from 'react-native'
import CreateTable from '../../../components/tables/CreateTable'
import Fab from '../../../components/fab/Fab'

const EggCollection = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.eggCollection)
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteButtonClick = (id: number): void => {
    eggColllectionDelete(id)
      .then(() => {
        dispatch(remove(id))
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    ;(async () => {
      await setLoading(true)
      await eggCollectionLoad()
        .then((arr) => {
          dispatch(load(arr))
          setLoading(false)
        })
        .catch((error) => console.error(error))
    })()

    const handleClipboard = Clipboard.addClipboardListener((): void => {
      Clipboard.getStringAsync().then((content: string) => {
        eggCollectionAdd(user.id || '', content.replace(/(\r\n|\n|\r)/gm, ''))
          .then((item) => {
            dispatch(
              add({
                ID: item.ID,
                User: user.id || '',
                Barcode: item.Barcode,
                Date: item.Date,
              }),
            )
          })
          .catch((error) => console.error(error))
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
        <>
          <CreateTable
            items={items && Object.keys(items).map((key) => items[key])}
            columns={[{ name: '№', value: 'Barcode' }]}
            handlers={{ delete: handleDeleteButtonClick }}
          />

          <Fab
            data={Object.keys(items).map((item) => {
              return {
                Пользователь: items[item].User,
                Код: items[item].Barcode,
                Дата: items[item].Date,
              }
            })}
            jobId='1'
            deleteAllCallback={async () => {
              await eggCollectionDeleteAll().then(() => {
                dispatch(removeAll())
              })
            }}
          />
        </>
      )}
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
})

export default EggCollection
