import { FAB, Portal, Provider } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { useAppTheme } from '../../hooks/useCustomTheme'

const Fab = () => {
  const theme = useAppTheme()
  const [state, setState] = useState({ open: false })

  const onStateChange = ({ open }: { open: boolean }): void => setState({ open })

  const { open } = state

  return (
    <FAB
      icon='content-save-outline'
      style={{ backgroundColor: theme.colors.primary, ...styles.fab }}
      color={'white'}
      size='small'
      onPress={() => console.log('Pressed')}
    />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
})

export default Fab
