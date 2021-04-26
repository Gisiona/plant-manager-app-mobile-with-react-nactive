import React, { useEffect } from 'react'

import Routes from './src/routes/index'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications';
import { PlantsDataProps } from './src/libs/storage';

export default function App() {

  const [fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // escuta as notificacoes e remove depois de ser entregue
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantsDataProps;
        console.log(data);
      });

      // remove a notification
      return () => subscription.remove();
  }, [])

  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  }

  return (
    <Routes />
  )
}

