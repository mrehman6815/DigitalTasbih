import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Vibration,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {checkDailyStreak, startTasbih, stopTasbih, incrementCount, resetTasbih} from '../../Store/tasbihSlice';
import {updateDailyStreak, updateLastAppOpenDate} from '../../Store/userSlice';
import TasbihBottomSheet from '../../components/TasbihBottomSheet';
import TasbihCounter from '../../components/TasbihCounter';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {isCounting, currentTasbih, tasbihs} = useSelector(state => state.tasbihReducer);

  // Debug: Log tasbihs data
  console.log('HomeScreen - tasbihs:', tasbihs);
  const [count, setCount] = useState(0);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(true);
  const [lastResetTime, setLastResetTime] = useState(Date.now());
  const [showControls, setShowControls] = useState(false);
  const [showTasbihSheet, setShowTasbihSheet] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  // Avatars array (should match your NameScreen avatars)
  const avatars = [
    {id: 1, source: require('../imgs/pics/man1.png')},
    {id: 2, source: require('../imgs/pics/mehndi.png')},
    {id: 3, source: require('../imgs/pics/man.png')},
    {id: 4, source: require('../imgs/pics/girl.png')},
    {id: 5, source: require('../imgs/pics/women3.png')},
    {id: 6, source: require('../imgs/pics/women2.png')},
    {id: 7, source: require('../imgs/pics/woman1.png')},
    {id: 8, source: require('../imgs/pics/women.png')},
  ];

  // Settings icon URI
  const settingsIcon = 'https://cdn-icons-png.flaticon.com/512/126/126472.png';

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    if (hour < 22) return 'Good evening';
    return 'Good night';
  };

  // Get emoji based on time
  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️';
    if (hour < 18) return '🌤️';
    if (hour < 22) return '🌙';
    return '✨';
  };

  // Check daily streak when app opens
  useEffect(() => {
    dispatch(checkDailyStreak());
    
    // Update user daily streak
    const today = new Date().toDateString();
    
    if (user?.lastAppOpenDate !== today) {
      const newStreak = (user?.dailyStreak || 0) + 1;
      dispatch(updateDailyStreak(newStreak));
      dispatch(updateLastAppOpenDate(today));
    }

    // Show choice modal if no tasbih is active and user has completed onboarding
    if (!currentTasbih && user?.name) {
      setShowChoiceModal(true);
    }
  }, [dispatch, user?.lastAppOpenDate, user?.dailyStreak, currentTasbih]);

  // Reset counter if it's a new day
  useEffect(() => {
    const checkForNewDay = () => {
      const now = new Date();
      const lastReset = new Date(lastResetTime);

      if (
        now.getDate() !== lastReset.getDate() ||
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear()
      ) {
        setCount(0);
        setLastResetTime(Date.now());
      }
    };

    const interval = setInterval(checkForNewDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastResetTime]);

  const handleScreenTap = () => {
    if (isCounting && currentTasbih) {
      // If currently counting a tasbih, increment the tasbih count
      dispatch(incrementCount());
      setCount(prevCount => prevCount + 1);
    } else {
      // General counting
      setCount(prevCount => prevCount + 1);
    }
    
    if (isVibrateEnabled) {
      Vibration.vibrate(50); // Short vibration feedback
    }
    setShowControls(false);
  };

  const resetCounter = () => {
    setCount(0);
    setLastResetTime(Date.now());
    setShowControls(false);
    
    // If a tasbih is active, reset its daily count
    if (currentTasbih) {
      dispatch(resetTasbih(currentTasbih.id));
    }
  };

  const toggleVibration = () => {
    setIsVibrateEnabled(prev => !prev);
    setShowControls(false);
  };

  const navigateToScreen = (screenName) => {
    setShowControls(false);
    navigation.navigate(screenName);
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  const handleStartTasbih = (tasbih) => {
    console.log('HomeScreen - Starting tasbih:', tasbih);
    setShowTasbihSheet(false);
    setShowControls(false);
    setCount(0); // Start counting from 0 for the selected tasbih
  };

  // If currently counting a tasbih, show the counter component
  if (isCounting && currentTasbih) {
    return (
      <TasbihCounter onBack={() => {
        // This will be handled by the TasbihCounter component
      }} />
    );
  }

  return (
    <View style={styles.container}>
      {/* User Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image
            source={
              user?.avatar 
                ? avatars.find(a => a.id === user.avatar)?.source || avatars[0].source
                : avatars[0].source
            }
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greetingText}>
              {getGreetingEmoji()} {getGreeting()},
            </Text>
            <Text style={styles.nameText}>{user?.name || 'User'}</Text>
            {currentTasbih && (
              <View style={styles.activeTasbihContainer}>
                <Text style={styles.activeTasbihText}>
                  Active: {currentTasbih.name}
                </Text>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => {
                    dispatch(stopTasbih());
                    setShowControls(false);
                    setCount(0); // Reset counter to 0
                  }}>
                  <Text style={styles.completeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.rightSection}>
          {/* Daily Streak */}
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>
              {user?.dailyStreak || 0}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleControls}
            style={styles.settingsButton}>
            <Image source={{uri: settingsIcon}} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
      </View>



      {/* Main Counter Area */}
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.counterContainer}>
          {/* Main counter display */}
          <Text style={styles.counterText}>{count}</Text>

          {/* Total and Today's Count Display */}
          {currentTasbih && (
            <View style={styles.countsDisplay}>
              <View style={styles.countItem}>
                <Text style={styles.countLabel}>Today</Text>
                <Text style={styles.countValue}>{currentTasbih.dailyCount || 0}</Text>
              </View>
              <View style={styles.countItem}>
                <Text style={styles.countLabel}>Total</Text>
                <Text style={styles.countValue}>{currentTasbih.counts || 0}</Text>
              </View>
            </View>
          )}

          {/* Controls overlay */}
          {showControls && (
            <View style={styles.controlsOverlay}>
              <TouchableOpacity
                onPress={toggleVibration}
                style={styles.controlButton}>
                <Text style={styles.controlText}>
                  Vibration: {isVibrateEnabled ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetCounter}
                style={styles.controlButton}>
                <Text style={styles.controlText}>Reset Counter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowTasbihSheet(true)}
                style={styles.controlButton}>
                <Text style={styles.controlText}>Start Tasbih</Text>
              </TouchableOpacity>
              {currentTasbih && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(stopTasbih());
                    setCount(0);
                    setShowControls(false);
                  }}
                  style={styles.controlButton}>
                  <Text style={styles.controlText}>Start General Counting</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigateToScreen('Azkar')}
                style={styles.controlButton}>
                <Text style={styles.controlText}>Azkar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('Settings')}
                style={styles.controlButton}>
                <Text style={styles.controlText}>More Settings</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Reset button (shown when counting) */}
          {count > 0 && !showControls && (
            <TouchableOpacity onPress={resetCounter} style={styles.resetButton}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Tasbih Bottom Sheet */}
      <TasbihBottomSheet
        visible={showTasbihSheet}
        onClose={() => setShowTasbihSheet(false)}
        onStartTasbih={handleStartTasbih}
      />

      {/* Choice Modal */}
      <Modal
        visible={showChoiceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowChoiceModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Your Activity</Text>
            <Text style={styles.modalMessage}>
              What would you like to do today?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowChoiceModal(false);
                  setShowTasbihSheet(true);
                }}>
                <Text style={styles.modalButtonText}>Start Tasbih</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowChoiceModal(false);
                }}>
                <Text style={styles.modalButtonText}>General Counting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1,
    position: 'absolute',
    top: 10,
    width: '90%',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#eaeaea',
  },
  textContainer: {
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f6ff',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  counterContainer: {
    flex: 1,
    backgroundColor: '#2F855A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: 'white',
    fontSize: 120,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  controlButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  controlText: {
    color: '#333',
    fontSize: 18,
  },
  resetButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
  },
  activeTasbihContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  activeTasbihText: {
    fontSize: 14,
    color: '#2F855A',
    fontWeight: '600',
    marginRight: 8,
  },
  completeButton: {
    backgroundColor: '#dc3545',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#2F855A',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countsDisplay: {
    position: 'absolute',
    top: 50,
    right: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  countItem: {
    alignItems: 'center',
    marginBottom: 8,
  },
  countLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  countValue: {
    fontSize: 18,
    color: '#2F855A',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
