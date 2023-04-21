import { Button, FAB, Modal, Portal, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useAppTheme } from '../../hooks/useCustomTheme'
import { useMakeCSV } from '../../hooks/useMakeCSV'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import moment from 'moment'
import { useState } from 'react'

interface iData {
  [key: string]: any
}

interface iProps {
  data: iData[]
  jobId: string
  deleteAllCallback: () => void
}

const Fab = (props: iProps) => {
  const theme = useAppTheme()
  const settings = useSelector((state: RootState) => state.settings)

  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  const handleClickSave = async (data: iData[]) => {
    await useMakeCSV(
      data,
      `${settings.area}.${settings.housing}.${moment().format('DD.MM')}.${props.jobId}`,
    )
  }

  const handleClickDelete = async () => {
    showModal()
  }

  const handleClickDeleteAll = async () => {
    props.deleteAllCallback()
    hideModal()
  }

  return (
    <>
      <FAB
        icon='content-save-outline'
        style={{ backgroundColor: theme.colors.primary, ...styles.save }}
        color={'white'}
        size='small'
        onPress={() => handleClickSave(props.data)}
      />
      <FAB
        icon='delete-forever'
        style={{ backgroundColor: theme.colors.error, ...styles.delete }}
        color={'white'}
        size='small'
        onPress={() => handleClickDelete()}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text variant='titleLarge' style={styles.text}>
            Удалить все записи?
          </Text>
          <View style={styles.buttonSet}>
            <Button mode='contained' onPress={() => handleClickDeleteAll()}>
              Подтвердить
            </Button>
            <Button mode='contained' buttonColor={theme.colors.error} onPress={() => hideModal()}>
              Отмена
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  save: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
  delete: {
    position: 'absolute',
    margin: 16,
    left: 50,
    bottom: 0,
  },
  buttonSet: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
  },
})

export default Fab
