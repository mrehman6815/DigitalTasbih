import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addTasbih, deleteTasbih, startTasbih} from '../Store/tasbihSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height} = Dimensions.get('window');

const TasbihBottomSheet = ({visible, onClose, onStartTasbih}) => {
  const dispatch = useDispatch();
  const {tasbihs, currentTasbih} = useSelector(state => state.tasbihReducer);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTasbihName, setNewTasbihName] = useState('');
  const handleStartTasbih = tasbih => {
    dispatch(startTasbih(tasbih));
    onStartTasbih(tasbih);
  };

  const handleAddTasbih = () => {
    if (newTasbihName.trim()) {
      dispatch(addTasbih({name: newTasbihName.trim()}));
      setNewTasbihName('');
      setShowAddModal(false);
      onClose(); // Close the main bottom sheet as well
    }
  };

  const handleDeleteTasbih = tasbih => {
    if (tasbih.isPredefined) {
      Alert.alert('Cannot Delete', 'Predefined tasbihs cannot be deleted.');
      return;
    }

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
  };

  const renderTasbihItem = ({item}) => (
    <View style={styles.tasbihItem}>
      <View style={styles.tasbihInfo}>
        <Text style={styles.tasbihName}>{item.name}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statText}>🔥 {item.streak} days</Text>
          <Text style={styles.statText}>📊 {item.counts} total</Text>
        </View>
        {item.lastTimeAndDate && (
          <Text style={styles.lastTimeText}>
            Last: {(() => {
              try {
                const date = new Date(item.lastTimeAndDate);
                if (isNaN(date.getTime())) {
                  return 'Never';
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
                return 'Never';
              }
            })()}
          </Text>
        )}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.startButton,
            currentTasbih?.id === item.id && styles.activeStartButton,
          ]}
          onPress={() => handleStartTasbih(item)}>
          <Icon 
            name={currentTasbih?.id === item.id ? "play-circle-filled" : "play-arrow"} 
            size={20} 
            color="white" 
          />
        </TouchableOpacity>
        {!item.isPredefined && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteTasbih(item)}>
            <Icon name="delete" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View style={styles.fullScreenContainer}>
        <View style={styles.fullScreenContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Tasbih</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}>
            <Text style={styles.addButtonText}>+ Add New Tasbih</Text>
          </TouchableOpacity>

          {/* Tasbih List */}
          <View style={styles.listContainer}>
            {tasbihs && tasbihs.length > 0 ? (
              <>
                <FlatList
                  data={tasbihs}
                  renderItem={renderTasbihItem}
                  keyExtractor={item => item.id}
                  style={styles.list}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  ListEmptyComponent={
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyStateText}>
                        No tasbihs found
                      </Text>
                      <Text style={styles.emptyStateSubtext}>
                        Add your first tasbih using the button above
                      </Text>
                    </View>
                  }
                />
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No tasbihs found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add your first tasbih using the button above
                </Text>
              </View>
            )}
          </View>

          {/* Add Tasbih Modal */}
          <Modal
            visible={showAddModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowAddModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Tasbih</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter tasbih name..."
                  value={newTasbihName}
                  onChangeText={setNewTasbihName}
                  autoFocus={true}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setShowAddModal(false);
                      setNewTasbihName('');
                    }}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleAddTasbih}>
                    <Text style={styles.confirmButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullScreenContent: {
    flex: 1,
    paddingTop: 20, // Reduced padding
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2F855A',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2F855A',
    marginHorizontal: 24,
    marginVertical: 12,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2F855A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  debugInfo: {
    backgroundColor: '#ffeb3b',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  testItem: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  testText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  tasbihItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tasbihInfo: {
    flex: 1,
  },
  tasbihName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F855A',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginRight: 20,
    fontWeight: '500',
  },
  lastTimeText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F855A',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#fafafa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#2F855A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2F855A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default TasbihBottomSheet;
