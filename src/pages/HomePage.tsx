import { BottomNavigation } from 'react-native-paper'
import JobsPage from './JobsPage'
import SettingsPage from './SettingsPage'
import { useMemo, useState } from 'react'
import { NavigationProp } from '../types'

const HomePage = ({ navigation, route }: NavigationProp): JSX.Element => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {
      key: 'jobs',
      title: 'Работы',
      focusedIcon: 'briefcase-plus',
      unfocusedIcon: 'briefcase-plus-outline',
    },
    { key: 'settings', title: 'Настройки', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ])
  const JobsRoute = () => useMemo(() => <JobsPage route={route} navigation={navigation} />, [])

  const SettingsRoute = () => useMemo(() => <SettingsPage />, [])

  const renderScene = BottomNavigation.SceneMap({
    jobs: JobsRoute,
    settings: SettingsRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default HomePage
