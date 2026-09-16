import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { DefaultTheme, NavigationContainer, NavigationProp } from '@react-navigation/native';
import { Theme } from './shared/themes/Theme';

type TScreenDefinitions = {
  Home: undefined;
  Settings: undefined;
}

const Stack = createStackNavigator<TScreenDefinitions>();



export function AppRoutes() {
  return (
    <NavigationContainer theme={{
      ...DefaultTheme,
      fonts:
      {
        ...DefaultTheme.fonts,
        bold:{
          fontFamily: Theme.fonts.interBold,
          fontWeight: '700'
        },
        regular:{
          fontFamily: Theme.fonts.interRegular,
          fontWeight: '500'
        }
      },
      colors:{
        ...DefaultTheme.colors,
    primary: Theme.colors.primary,
    background: Theme.colors.backgorund,
    text: Theme.colors.text,
    },
    }}>

    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TNavigationScreenProps = NavigationProp<TScreenDefinitions>;