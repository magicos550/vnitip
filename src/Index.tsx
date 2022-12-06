import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import AuthorizationPage from './pages/AuthorizationPage'
import SettingsPage from './pages/SettingsPage'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

export type StackParamsList = {
  Authorization: undefined
  Home: undefined
  Jobs: undefined
  Settings: undefined
}
  
const Stack = createNativeStackNavigator<StackParamsList>()

export default function Index () {
  const user = useSelector((state: RootState) => state.user)
  
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user.id === null ? (
            <Stack.Screen
            name="Authorization"
            component={AuthorizationPage}
              />
          ) : (
            <Stack.Screen name="Home" component={HomePage} />
          )}
          <Stack.Screen name='Jobs' component={JobsPage} />
          <Stack.Screen name='Settings' component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}