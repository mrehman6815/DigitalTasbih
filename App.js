import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstScreen from './src/screens/FirstScreen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';
import Screen4 from './src/screens/Screen4';
import HomeScreen from './src/screens/Home';
import NameScreen from './src/screens/Name';
import SplashScreen from './src/screens/Splash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/Store/Store';
import Toast from 'react-native-toast-message';
import OnBoardingScreen from './src/screens/OnBoarding';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import AzkarScreen from './src/screens/Azkar/AzkarScreen';
import TermsAndConditionsScreen from './src/screens/TermsAndConditions/TermsAndConditionsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicy/PrivacyPolicyScreen';
import FAQsScreen from './src/screens/FAQs/FAQsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Name" component={NameScreen} />
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Azkar" component={AzkarScreen} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="FAQs" component={FAQsScreen} />
            {/* <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          // options={{title: 'Welcome', headerShown: false}}
        />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
        <Stack.Screen name="Screen4" component={Screen4} /> */}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
