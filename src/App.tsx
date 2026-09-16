import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './pages/Home';
import { useFonts } from 'expo-font';
import * as SplashScreen  from 'expo-splash-screen';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import {AppRoutes} from './AppRoutes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from './shared/themes/Theme';

SplashScreen.preventAutoHideAsync();

export  function App() {
  const [loaded, error] = useFonts({
   interRegular: Inter_400Regular,
    interBold:Inter_700Bold
  });
// trava a tela ate carregar as fontes 
useEffect(()=>{
  if(loaded || error){
    SplashScreen.hide()
  }
 }, [loaded, error]
)

//se a fonte não carregou então não precisa desenhar a tela ainda 
if (!loaded && !error) return null;

  return (
    //safe area delimita o tamanho do coteudo exibido para não utrapassar
    <SafeAreaView style={{flex:1, backgroundColor: Theme.colors.backgorund}}>
     {/* //configura a cor do texto da barra de status */}
      <StatusBar style='light'/>
  < AppRoutes />
    </SafeAreaView>
  )
}



