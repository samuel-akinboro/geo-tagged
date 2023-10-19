import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { Ionicons, Feather} from '@expo/vector-icons'
import MapScreen from './screens/MapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { ImageGalleryProvider } from './Providers/ImageGallery';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name='Home' 
        component={HomeScreen} 
        options={{
          headerTitle: 'Your Photos',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
        }} 
      />
      <Tab.Screen 
        name='Map' 
        component={MapScreen} 
        options={{
          headerTitle: 'Photo Map',
          tabBarIcon: ({ color }) => <Feather name="map-pin" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <ImageGalleryProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Main" component={MainRoute} options={{headerShown: false}} />
                <Stack.Screen name="Camera" component={CameraScreen} options={{headerBackTitle: 'back'}} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </ImageGalleryProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
