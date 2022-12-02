import { View, StyleSheet } from 'react-native'
import { IconButton, MD3Colors, Text, withTheme } from 'react-native-paper'
import { useAppTheme } from '../../App'

const JobsPage = (): JSX.Element => {
  const theme = useAppTheme()
  return (
    <View style={styles.menu}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  menuButton: {
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    color: '#ffffff',
    marginTop: 0,
    textAlign: 'center',
  },
})

export default JobsPage
