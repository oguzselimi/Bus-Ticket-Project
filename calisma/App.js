


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';






import TravelDaysScreen from "./study/screens/TravelDaysScreen"
import LoginScreen from './study/screens/LoginScreen';
import SignupScreen from './study/screens/SignupScreen';
import WelcomeScreen from './study/screens/WelcomeScreen';
import { Colors } from './study/constants/styles';
import AuthContextProvider, { AuthContext } from './study/store/auth-context';
import { useContext, useState } from 'react';
import IconButton from './study/components/ui/IconButton';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';






const Stack = createNativeStackNavigator();

function AuthStack() {
 return (
   <Stack.Navigator
     screenOptions={{
       headerStyle: { backgroundColor: Colors.primary500 },
       headerTintColor: 'white',
       contentStyle: { backgroundColor: Colors.primary100 },
     }}
   >
     <Stack.Screen name="Giriş Sayfasi" component={LoginScreen} />
     <Stack.Screen name="Kayit Olma Sayfasi" component={SignupScreen} />
   </Stack.Navigator>
 );
}

function AuthenticatedStack() {
 const authCtx = useContext(AuthContext);
 return (
   <Stack.Navigator
     screenOptions={{
       headerStyle: { backgroundColor: Colors.primary500 },
       headerTintColor: 'white',
       contentStyle: { backgroundColor: Colors.primary100 },
     }}
   >
     <Stack.Screen
       name="Şehir Seçiniz"
       component={WelcomeScreen}
       options={{
         headerRight: ({ tintColor }) => (
           <IconButton
             icon="exit"
             color={tintColor}
             size={24}
             onPress={authCtx.logout}
           />
         ),
       }}
     />
     <Stack.Screen 
     name="Sefer Saatleri"
     component={TravelDaysScreen}
     />
   </Stack.Navigator>
 );
}

function Navigation() {
 const authCtx = useContext(AuthContext);

 return (
   <NavigationContainer>
     {!authCtx.isAuthenticated && <AuthStack />}
     {authCtx.isAuthenticated && <AuthenticatedStack />}
   </NavigationContainer>
 );
}

function Root() {
 const [isTryingLogin, setIsTryingLogin] = useState(true);

 const authCtx = useContext(AuthContext);

 useEffect(() => {
   async function fetchToken() {
     const storedToken = await AsyncStorage.getItem('token');

     if (storedToken) {
       authCtx.authenticate(storedToken);
     }

     setIsTryingLogin(false);
   }

   fetchToken();
 }, []);

 if (isTryingLogin) {
   return <AppLoading />;
 }

 return <Navigation />;
}

export default function App() {
 
 return (
   <>
     <StatusBar style="light" />
     <AuthContextProvider>
       <Root />
     </AuthContextProvider>
   </>
 );
}  