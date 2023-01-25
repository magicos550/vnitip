import { ActivityIndicator, DataTable, IconButton } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { useAppTheme } from '../../../hooks/useCustomTheme'
import * as Clipboard from 'expo-clipboard'
import { RootState, useAppDispatch } from '../../../store/store'
import { add, load, remove } from '../../../store/slices/jobs/eggCollectionSlice'
import { useSelector } from 'react-redux'
import {
  eggCollectionAdd,
  eggCollectionLoad,
  eggColllectionDelete,
} from '../../../database/CRUD/EggCollection'
import { StyleSheet, View } from 'react-native'
import CreateTable from '../../../components/tables/CreateTable'
import Fab from '../../../components/fab/Fab'

const EggCollection = (): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.eggCollection)
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
        eggCollectionAdd(content)
          .then((item) => {
            dispatch(
              add({
                ID: item.ID,
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
            items={items}
            columns={[{ name: '№', value: 'Barcode' }]}
            handlers={{ delete: handleDeleteButtonClick }}
          />

          <Fab />
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
