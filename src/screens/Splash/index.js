// SplashScreen.js
import React, {useEffect, useRef} from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateIsOnBoarding} from '../../Store/userSlice';

const SplashScreen = ({navigation}) => {
  const {user, isOnBoarding, hasCompletedOnboarding} = useSelector(state => state.userReducer);
  // Create animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  useEffect(() => {
    // Start the animation when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
    dispatch(updateIsOnBoarding(false));
    // Navigate after 3 seconds
    setTimeout(() => {
      if (hasCompletedOnboarding && user?.name) {
        // User has completed onboarding and has a name - go directly to Home
        navigation.replace('Home');
      } else if (hasCompletedOnboarding && !user?.name) {
        // User completed onboarding but no name - go to Name screen
        navigation.replace('Name');
      } else {
        // First time user - go to OnBoarding
        navigation.replace('OnBoarding');
      }
    }, 3000);
  }, []);

  // useEffect(() => {
  //   Animated.spring(bounceAnim, {
  //     toValue: 1,
  //     friction: 1,
  //     tension: 10,
  //     useNativeDriver: true,
  //   }).start();
  //   setTimeout(() => {
  //     navigation.replace('Name');
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   Animated.timing(rotateAnim, {
  //     toValue: 1,
  //     duration: 2000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  //   setTimeout(() => {
  //     navigation.replace('Name');
  //   }, 3000);
  // }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        style={styles.backgroundImage}
        source={require('../imgs/backimage.jpeg')}
      />

      {/* Animated Centered Logo */}
      <Animated.Image
        style={[
          styles.centeredImage,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
            // transform: [{scale: bounceAnim}],
            // transform: [
            //   {scale: scaleAnim},
            //   {
            //     rotate: rotateAnim.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: ['0deg', '360deg'],
            //     }),
            //   },
            // ],
          },
        ]}
        source={require('../imgs/tasbihlogo.png')}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default SplashScreen;
