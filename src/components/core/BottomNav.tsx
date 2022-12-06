// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import JobsPage from '../../pages/JobsPage'
import SettingsPage from '../../pages/SettingsPage'
import { Ionicons } from '@expo/vector-icons'

// const Tab = createMaterialBottomTabNavigator()

const BottomNav = (): JSX.Element => {
  return (
    <>
      {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName

            if (route.name === 'Jobs') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            return <Ionicons name={iconName} iconColor={color} size={20} />
          },
        })}
      >
        <Tab.Screen name='Jobs' component={JobsPage} options={{ title: 'Задачи' }} />
        <Tab.Screen name='Settings' component={SettingsPage} options={{ title: 'Настройки' }} />
      </Tab.Navigator> */}
    </>
  )
}

export default BottomNav
