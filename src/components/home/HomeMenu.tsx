import { View, StyleSheet } from 'react-native'
import { IconButton, MD3Colors, Text } from 'react-native-paper'
import { AppTheme } from '../../../App'

interface iProps {
  theme: AppTheme
}

const HomeMenu = ({ theme }: iProps): JSX.Element => {
  return (
    <>
      <View style={[styles.menuButton, { backgroundColor: theme.colors.menuRed }]}>
        <IconButton icon='plus-circle-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Новый документ</Text>
      </View>

      <View style={[styles.menuButton, { backgroundColor: theme.colors.menuOrange }]}>
        <IconButton icon='play-circle-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Продолжить</Text>
      </View>

      <View style={[styles.menuButton, { backgroundColor: theme.colors.menuPurple }]}>
        <IconButton icon='file-search-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Каталог документов</Text>
      </View>

      <View style={[styles.menuButton, { backgroundColor: theme.colors.menuGreen }]}>
        <IconButton icon='cloud-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Отправить документ</Text>
      </View>

      <View style={[styles.menuButton, { backgroundColor: theme.colors.menuBlue }]}>
        <IconButton icon='cog-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Настройки</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    backgroundColor: '#c4c4c4',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  menuText: {
    color: '#ffffff',
    marginTop: 0,
  },
})

export default HomeMenu
