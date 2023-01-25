import { Appbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { logout } from '../../store/slices/userSlice'

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user)

  return (
    <Appbar.Header>
      <Appbar.Content titleStyle={{ fontSize: 16 }} title={`Пользователь: ${user.id}`} />
      <Appbar.Action icon='logout' onPress={() => dispatch(logout())} />
    </Appbar.Header>
  )
}

export default Header
