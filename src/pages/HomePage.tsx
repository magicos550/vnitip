import React from 'react';
import { BottomNavigation } from 'react-native-paper'
import JobsPage from './JobsPage';
import SettingsPage from './SettingsPage';

const JobsRoute = () => <JobsPage />;

const SettingsRoute = () => <SettingsPage />;
  
const HomePage = (): JSX.Element => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'jobs', title: 'Работы', focusedIcon: 'briefcase-plus', unfocusedIcon: 'briefcase-plus-outline'},
    { key: 'settings', title: 'Настройки', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    jobs: JobsRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
  )
}

export default HomePage
