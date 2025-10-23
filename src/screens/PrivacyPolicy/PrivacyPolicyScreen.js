import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;

const PrivacyPolicyScreen = ({navigation}) => {
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
            <Text style={styles.titleText}>Privacy Policy</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
            
            <Text style={styles.paragraph}>
              At Digital Tasbih, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we handle your information when you use our mobile application.
            </Text>

            <Text style={styles.subtitle}>1. Information We Collect</Text>
            <Text style={styles.paragraph}>
              Digital Tasbih is designed with privacy in mind. We collect minimal information:
            </Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Local Data Only:</Text> All your tasbih counts, streaks, and personal settings are stored locally on your device</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>No Personal Information:</Text> We do not collect your name, email, phone number, or any other personal identifiers</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>No Analytics:</Text> We do not track your usage patterns or collect analytics data</Text>

            <Text style={styles.subtitle}>2. How We Use Your Information</Text>
            <Text style={styles.paragraph}>
              Since we do not collect personal information, there is no external processing of your data. All functionality operates locally on your device:
            </Text>
            <Text style={styles.listItem}>• Tasbih counting and tracking</Text>
            <Text style={styles.listItem}>• Daily streak calculations</Text>
            <Text style={styles.listItem}>• Custom tasbih management</Text>
            <Text style={styles.listItem}>• Progress statistics</Text>

            <Text style={styles.subtitle}>3. Data Storage and Security</Text>
            <Text style={styles.paragraph}>
              Your data security is our priority:
            </Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Local Storage:</Text> All data is stored locally on your device using secure storage methods</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>No Cloud Storage:</Text> We do not upload or store your data on external servers</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Device Security:</Text> Your data is protected by your device's built-in security features</Text>

            <Text style={styles.subtitle}>4. Data Sharing</Text>
            <Text style={styles.paragraph}>
              We do not share, sell, or transfer your personal information to third parties because we do not collect any personal information from you.
            </Text>

            <Text style={styles.subtitle}>5. Your Rights</Text>
            <Text style={styles.paragraph}>
              Under applicable privacy laws, you have the following rights:
            </Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Access:</Text> View all your data stored locally in the app</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Delete:</Text> Remove all your data using the "Remove All Data" feature in Settings</Text>
            <Text style={styles.listItem}>• <Text style={styles.bold}>Control:</Text> You have full control over your data as it's stored locally</Text>

            <Text style={styles.subtitle}>6. Children's Privacy</Text>
            <Text style={styles.paragraph}>
              Digital Tasbih is suitable for users of all ages. Since we do not collect personal information, there are no special considerations for children's privacy. However, we encourage parental guidance for young users.
            </Text>

            <Text style={styles.subtitle}>7. Third-Party Services</Text>
            <Text style={styles.paragraph}>
              Our app may use third-party services for:
            </Text>
            <Text style={styles.listItem}>• App store distribution (Google Play Store, Apple App Store)</Text>
            <Text style={styles.listItem}>• Device vibration functionality</Text>
            <Text style={styles.paragraph}>
              These services have their own privacy policies, and we encourage you to review them.
            </Text>

            <Text style={styles.subtitle}>8. Data Retention</Text>
            <Text style={styles.paragraph}>
              Your data is retained as long as you use the app and is automatically deleted when you uninstall the app or use the "Remove All Data" feature.
            </Text>

            <Text style={styles.subtitle}>9. Changes to This Policy</Text>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app and updating the "Last updated" date.
            </Text>

            <Text style={styles.subtitle}>10. Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </Text>
            <Text style={styles.listItem}>• Email: umohammad552@gmail.com</Text>
            <Text style={styles.listItem}>• WhatsApp: 03039223651</Text>
            <Text style={styles.paragraph}>
              You can also reach us through the app store where you downloaded Digital Tasbih.
            </Text>

            <Text style={styles.subtitle}>11. Compliance</Text>
            <Text style={styles.paragraph}>
              This Privacy Policy complies with:
            </Text>
            <Text style={styles.listItem}>• General Data Protection Regulation (GDPR)</Text>
            <Text style={styles.listItem}>• California Consumer Privacy Act (CCPA)</Text>
            <Text style={styles.listItem}>• Google Play Store Privacy Policy requirements</Text>
            <Text style={styles.listItem}>• Apple App Store Privacy Guidelines</Text>
          </View>
        </ScrollView>
      </View>
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
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 1,
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
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0a5c36',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginLeft: 20,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen; 