import { Appbar } from 'react-native-paper'

const Header = (): JSX.Element => {
  return (
    <Appbar.Header>
      <Appbar.Action icon='menu' onPress={() => void 0} />
      <Appbar.Content title='ВНИТИП' />
      <Appbar.Action icon='calendar' onPress={() => void 0} />
      <Appbar.Action icon='magnify' onPress={() => void 0} />
    </Appbar.Header>
  )
}

export default Header
