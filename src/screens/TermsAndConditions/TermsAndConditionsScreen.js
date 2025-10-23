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

const TermsAndConditionsScreen = ({navigation}) => {
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
            <Text style={styles.titleText}>Terms & Conditions</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms and Conditions</Text>
            <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
            
            <Text style={styles.paragraph}>
              Welcome to Digital Tasbih. By downloading, installing, or using our mobile application, you agree to be bound by these Terms and Conditions.
            </Text>

            <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
              By accessing and using Digital Tasbih, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </Text>

            <Text style={styles.subtitle}>2. Description of Service</Text>
            <Text style={styles.paragraph}>
              Digital Tasbih is a mobile application designed to help users track their daily tasbih (prayer counter) counts, maintain streaks, and manage their spiritual practices. The app provides:
            </Text>
            <Text style={styles.listItem}>• Digital tasbih counting functionality</Text>
            <Text style={styles.listItem}>• Daily streak tracking</Text>
            <Text style={styles.listItem}>• Custom tasbih creation</Text>
            <Text style={styles.listItem}>• Progress monitoring and statistics</Text>

            <Text style={styles.subtitle}>3. User Responsibilities</Text>
            <Text style={styles.paragraph}>
              You are responsible for:
            </Text>
            <Text style={styles.listItem}>• Maintaining the confidentiality of your data</Text>
            <Text style={styles.listItem}>• Using the app in accordance with applicable laws</Text>
            <Text style={styles.listItem}>• Not using the app for any illegal or unauthorized purpose</Text>
            <Text style={styles.listItem}>• Respecting the religious and spiritual nature of the application</Text>

            <Text style={styles.subtitle}>4. Privacy and Data</Text>
            <Text style={styles.paragraph}>
              Your personal data, including tasbih counts and streaks, are stored locally on your device. We do not collect, store, or transmit your personal data to external servers. Please refer to our Privacy Policy for more details.
            </Text>

            <Text style={styles.subtitle}>5. Intellectual Property</Text>
            <Text style={styles.paragraph}>
              Digital Tasbih and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </Text>

            <Text style={styles.subtitle}>6. Disclaimer</Text>
            <Text style={styles.paragraph}>
              The app is provided "as is" without any warranties. We do not guarantee that the app will be error-free or uninterrupted. The app is designed for spiritual and religious purposes and should not be considered as religious guidance or fatwa.
            </Text>

            <Text style={styles.subtitle}>7. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              In no event shall Digital Tasbih be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </Text>

            <Text style={styles.subtitle}>8. Changes to Terms</Text>
            <Text style={styles.paragraph}>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </Text>

            <Text style={styles.subtitle}>9. Contact Information</Text>
            <Text style={styles.paragraph}>
              If you have any questions about these Terms and Conditions, please contact us:
            </Text>
            <Text style={styles.listItem}>• Email: umohammad552@gmail.com</Text>
            <Text style={styles.listItem}>• WhatsApp: 03039223651</Text>
            <Text style={styles.paragraph}>
              You can also reach us through the app store where you downloaded Digital Tasbih.
            </Text>

            <Text style={styles.subtitle}>10. Governing Law</Text>
            <Text style={styles.paragraph}>
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which the app is distributed, without regard to its conflict of law provisions.
            </Text>
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
    marginBottom: 5,
  },
});

export default TermsAndConditionsScreen; 