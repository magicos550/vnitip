import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthorizationPage from './pages/AuthorizationPage'
import SettingsPage from './pages/SettingsPage'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import { RootState, useAppDispatch, useAppSelector } from './store/store'
import EggCollection from './pages/jobs/EggCollection/EggCollection'
import EggMass from './pages/jobs/EggMass/EggMass'
import LiveWeight from './pages/jobs/LiveWeight/LiveWeight'
import Appraisal from './pages/jobs/Appraisal/Appraisal'
import { save } from './store/slices/settingsSlice'
import { iSettings, StackParamsList } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator<StackParamsList>()

const getSettings = async (): Promise<iSettings | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem('settings')
    return jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.error(e)
  }
}

export default function Index(): JSX.Element {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user)

  getSettings().then((res) => {
    res && dispatch(save(res))
  })

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user.id === null ? (
            <Stack.Screen name='Authorization' component={AuthorizationPage} />
          ) : (
            <Stack.Screen name='Home' component={HomePage} />
          )}
          <Stack.Screen name='Jobs' component={JobsPage} />
          <Stack.Screen name='Settings' component={SettingsPage} />

          <Stack.Screen name='EggCollection' component={EggCollection} />
          <Stack.Screen name='EggMass' component={EggMass} />
          <Stack.Screen name='LiveWeight' component={LiveWeight} />
          <Stack.Screen name='Appraisal' component={Appraisal} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
