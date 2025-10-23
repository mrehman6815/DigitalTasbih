import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateIsOnBoarding, setOnboardingCompleted} from '../../Store/userSlice';
const hand = require('../../images/hand.png');
const prayer = require('../../images/prayer.png');
const tasbih = require('../../images/tasbih.png');
const {width} = Dimensions.get('window');

const slides = [
  {
    image: tasbih,
    hadith:
      '“The best remembrance is: La ilaha illallah.”\n— Prophet Muhammad (ﷺ)',
  },
  {
    image: prayer,
    hadith:
      '“SubhanAllah, Alhamdulillah, La ilaha illallah, Allahu Akbar.”\n— A treasure from Jannah.',
  },
  {
    image: hand,
    hadith:
      '“Keep your tongue moist with the remembrance of Allah.”\n— Prophet Muhammad (ﷺ)',
  },
];

const OnBoardingScreen = ({navigation}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(updateIsOnBoarding(true));
    dispatch(setOnboardingCompleted(true));
    navigation.replace('Name');
  };

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const goToSlide = index => {
    scrollRef.current.scrollTo({x: index * width, animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}>
        {slides.map((slide, index) => (
          <View style={styles.slide} key={index}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.hadith}>{slide.hadith}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToSlide(index)}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? 'Continue' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  hadith: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#0c8a7b',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0c8a7b',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnBoardingScreen;
