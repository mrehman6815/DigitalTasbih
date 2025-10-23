import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../Store/userSlice';
import {resetAllData, startTasbih, deleteTasbih} from '../../Store/tasbihSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;

const SettingsScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {tasbihs, currentTasbih} = useSelector(state => state.tasbihReducer);

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

  // Set initial name from user data
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleSaveSettings = () => {
    navigation.goBack();
  };

  const handleChangeImage = () => {
    navigation.navigate('Name');
  };

  const handleRemoveAllData = () => {
    setShowDeleteModal(true);
  };

  const confirmRemoveAllData = () => {
    // Clear all user data
    dispatch(updateUser({}));
    // Clear all tasbih data
    dispatch(resetAllData());
    setShowDeleteModal(false);
    Alert.alert('Success', 'All data has been removed successfully.');
  };

  const handleNavigateToScreen = screenName => {
    switch (screenName) {
      case 'Terms and Conditions':
        navigation.navigate('TermsAndConditions');
        break;
      case 'Privacy Policy':
        navigation.navigate('PrivacyPolicy');
        break;
      case 'FAQs':
        navigation.navigate('FAQs');
        break;
      default:
        Alert.alert('Coming Soon', `${screenName} will be available soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.titleText}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Settings</Text>

            <View style={styles.profileImageContainer}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleChangeImage}>
                <Image
                  source={
                    user?.avatar
                      ? avatars.find(a => a.id === user.avatar)?.source ||
                        avatars[0].source
                      : avatars[0].source
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Name</Text>
              <View style={styles.nameContainer}>
                <Text style={styles.currentName}>{user?.name || ''}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Tasbihs</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tasbihsScrollContent}>
              {tasbihs.map((tasbih) => (
                <TouchableOpacity
                  key={tasbih.id}
                  style={[
                    styles.tasbihCard,
                    currentTasbih?.id === tasbih.id && styles.activeTasbihCard
                  ]}
                  onPress={() => {
                    dispatch(startTasbih(tasbih));
                    navigation.goBack();
                  }}>
                  <View style={styles.tasbihCardContent}>
                    <Text style={styles.tasbihName}>{tasbih.name}</Text>
                    <Text style={styles.tasbihCount}>{tasbih.counts}</Text>
                    <Text style={styles.tasbihStreak}>🔥 {tasbih.streak} days</Text>
                    {tasbih.lastTimeAndDate && (
                      <Text style={styles.lastTimeText}>
                        {(() => {
                          try {
                            const date = new Date(tasbih.lastTimeAndDate);
                            if (isNaN(date.getTime())) {
                              return 'Never used';
                            }
                            const now = new Date();
                            const diffTime = Math.abs(now - date);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            
                            if (diffDays === 1) {
                              return 'Yesterday';
                            } else if (diffDays === 0) {
                              return 'Today';
                            } else if (diffDays < 7) {
                              return `${diffDays} days ago`;
                            } else {
                              return date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              });
                            }
                          } catch (error) {
                            return 'Never used';
                          }
                        })()}
                      </Text>
                    )}
                    {currentTasbih?.id === tasbih.id && (
                      <View style={styles.activeIndicator}>
                        <Text style={styles.activeText}>Active</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.tasbihCardActions}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.startButton,
                        currentTasbih?.id === tasbih.id && styles.activeStartButton
                      ]}
                      onPress={() => {
                        dispatch(startTasbih(tasbih));
                        navigation.goBack();
                      }}>
                      <Icon 
                        name={currentTasbih?.id === tasbih.id ? "play-circle-filled" : "play-arrow"} 
                        size={18} 
                        color="white" 
                      />
                    </TouchableOpacity>
                    {!tasbih.isPredefined && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => {
                          Alert.alert(
                            'Delete Tasbih',
                            `Are you sure you want to delete "${tasbih.name}"? All counts and data will be lost permanently.`,
                            [
                              {text: 'Cancel', style: 'cancel'},
                              {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () => dispatch(deleteTasbih(tasbih.id)),
                              },
                            ],
                          );
                        }}>
                        <Icon name="delete" size={18} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => handleNavigateToScreen('Terms and Conditions')}>
              <Text style={styles.settingLabel}>Terms and Conditions</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => handleNavigateToScreen('Privacy Policy')}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => handleNavigateToScreen('FAQs')}>
              <Text style={styles.settingLabel}>FAQs</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleRemoveAllData}>
              <Text style={styles.settingLabel}>Remove All Data</Text>
              <Icon name="delete" size={24} color="#dc3545" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSettings}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remove All Data</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove all your data? This action cannot
              be undone and will delete:
            </Text>
            <Text style={styles.modalList}>
              • All tasbih counts and streaks{'\n'}• User profile information
              {'\n'}• Custom tasbihs{'\n'}• All app settings
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmRemoveAllData}>
                <Text style={styles.deleteButtonText}>Delete All Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 20,
    backgroundColor: '#E8F4F8',
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a5c36',
    borderWidth: 0,
    borderRadius: 25,
    height: 70,
    width: width - HORIZONTAL_PADDING * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  titleText: {
    flex: 1,
    fontSize: 42,
    color: 'white',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 2,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 8,
    marginRight: 8,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  currentName: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginLeft: 'auto',
  },
  profileImageContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#0a5c36',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  changeImageText: {
    color: '#0a5c36',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
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
    marginBottom: 15,
    lineHeight: 22,
  },
  modalList: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasbihsScrollContent: {
    paddingHorizontal: 5,
  },
  tasbihCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tasbihCardContent: {
    flex: 1,
    alignItems: 'center',
  },
  tasbihCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  startButton: {
    backgroundColor: '#2F855A',
  },
  activeStartButton: {
    backgroundColor: '#1a5c2e',
    shadowColor: '#1a5c2e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  tasbihName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  tasbihCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F855A',
    marginBottom: 5,
  },
  tasbihStreak: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  lastTimeText: {
    fontSize: 10,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 4,
  },
  activeTasbihCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#2F855A',
    borderWidth: 2,
  },
  activeIndicator: {
    backgroundColor: '#2F855A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  activeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
