import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Send background image to the back
  },
  centeredImage: {
    width: 150,  // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  },
});

