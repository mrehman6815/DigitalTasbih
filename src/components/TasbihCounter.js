import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, stopTasbih } from '../Store/tasbihSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const TasbihCounter = ({ onBack }) => {
  const dispatch = useDispatch();
  const { currentTasbih, currentCount, isCounting } = useSelector(
    state => state.tasbihReducer
  );

  const handleTap = () => {
    if (isCounting) {
      dispatch(incrementCount());
      Vibration.vibrate(50);
    }
  };

  const handleStop = () => {
    dispatch(stopTasbih());
    if (onBack) {
      onBack();
    }
  };

  if (!currentTasbih || !isCounting) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleStop}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.tasbihName}>{currentTasbih.name}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Counter Display */}
      <TouchableOpacity style={styles.counterContainer} onPress={handleTap}>
        <Text style={styles.counterText}>{currentCount}</Text>
        <Text style={styles.tapText}>Tap to count</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Today's Count</Text>
          <Text style={styles.statValue}>{currentCount}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Count</Text>
          <Text style={styles.statValue}>
            {currentTasbih.counts + currentCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>{currentTasbih.streak} days</Text>
        </View>
      </View>

      {/* Stop Button */}
      <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
        <Text style={styles.stopButtonText}>Stop & Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F855A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tasbihName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  placeholder: {
    width: 44,
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  counterText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  tapText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    minWidth: 80,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  stopButton: {
    backgroundColor: 'rgba(220, 53, 69, 0.9)',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  stopButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TasbihCounter; 