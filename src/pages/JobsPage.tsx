import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { IconButton, MD3Colors, Text } from 'react-native-paper'
import { useAppTheme } from '../hooks/useCustomTheme'
import { NavigationProp } from '../types'

const JobsPage = ({ navigation }: NavigationProp): JSX.Element => {
  const theme = useAppTheme()
  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: theme.colors.menuRed }]}
        onPress={() => navigation.navigate('EggCollection')}
      >
        <IconButton icon='egg-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Сбор яйца</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: theme.colors.menuOrange }]}
        onPress={() => navigation.navigate('EggMass')}
      >
        <IconButton icon='scale-balance' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Взвешивание яйца</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: theme.colors.menuPurple }]}>
        <IconButton icon='scale' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>ЖМ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, { backgroundColor: theme.colors.menuGreen }]}>
        <IconButton icon='notebook-plus-outline' iconColor={MD3Colors.neutral90} size={80} />
        <Text style={styles.menuText}>Бонитировка</Text>
      </TouchableOpacity>
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
